import {finishAGM, createProposal, addUser, removeUser, getNumOfUsers, transferOwnership, getOwners, executeProposal, getIsFinished} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress, createAlert, showView} from './authentication';
import {upload} from '../../provider/IPFSUploadProvider';
import {getVotingOption, getWeightOfShareholder, getNumOfVotingShareholders, getNumOfProposals, appendVotingOptionToProposal, getProposal, incrementPropId, getPropId} from '../../provider/ProposalProvider';
import {mapProposal} from './voting';
//import {showStatistics} from './statistics';
//import {Piechart} from './statistics';

// only once executed, show stat link, show voting options of every sh who voted, show winning opt with special color, abstain
var totalVotingCount = 0;
var votingShareholders = [];
var shareholdersSortedByWeight = [];

$(document).ready(function() {

    $('a[href="#setup"]').click(function() {

        $('main').on('click', 'input[id="proposal-creator-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            console.log('activeUserAddress: ' + activeUserAddress);
            //console.log('ownerAddress: ' + ownerAddress);
            //console.log('activeUserAdr: ' + activeUserAddress);
            //console.log('owner: ' + owner.toUpperCase());
            /*console.log(await getOwners());
            console.log('hasPermission: ' + (await getOwners()).includes(activeUserAddress.toLowerCase()))*/
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            
            const propName = $('#proposal-name').val();
            const propDescription = $('#proposal-description').val();
            var propHash = await upload(propDescription);
            const propOptions = $('#proposal-options').val();
            const parts = propOptions.split(',');
            var propId = (await getPropId()).toNumber();
            console.log('propId: ' + propId);
            for (var i = 0; i < parts.length; i++) {
                await appendVotingOptionToProposal(propId, parts[i].trim(), activeUserAddress);
            }
            await appendVotingOptionToProposal(propId, 'abstain', activeUserAddress);
            await createProposal(propName, propHash, propOptions, activeUserAddress);
            await incrementPropId(activeUserAddress);
            // store propId in contract if proposal creation is splitted
            //console.log(activeUserAddress, propName, propDescription, propOptions);
        });

        $('main').on('click', 'input[id="add-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newUserAddress = $('#new-user-address').val().toLowerCase();
            const role = parseInt($('#director-flag').val());
            //console.log('role: ' + typeof(role));
            const numOfShares = $('#num-of-shares').val();
            addUser(newUserAddress, role, numOfShares, activeUserAddress);
            getNumOfUsers();
            const mapRole = role === 0 ? 'AgmOwner': (role === 1 ? 'Director': 'Shareholder');
            //console.log('mapRole: ' + mapRole);  
            //setAuthorizedUsers(newUserAddress, {role: mapRole, loggedIn: false, shares: parseInt(numOfShares)});
            //console.log(getAuthorizedUsers());

        });

        $('main').on('click', 'input[id="remove-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress().toLowerCase();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const adrOfRemovedUser = $('#remove-user-address').val().toLowerCase();
            removeUser(adrOfRemovedUser, activeUserAddress);
            getNumOfUsers();
        });

        $('main').on('click', 'input[id="transfer-ownership-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newOwnerAddress = $('#ownership-address').val().toLowerCase();
            console.log(newOwnerAddress);
            await transferOwnership(newOwnerAddress, activeUserAddress);
        
        });

        $('main').on('click', '#finish-AGM-button', async function() {
            //console.log('before: ' + await getIsFinished());
            if (!(await getIsFinished())) {
                showView('statistics-link');
                await finishAGM(getActiveUserAddress());
                //console.log('after: ' + await getIsFinished());
                createAlert('The AGM was successfully finished');
                //var proposalNum = await getNumOfProposals();
                //console.log('proposalNum: ' + proposalNum); 
                //console.log(document.body);
                showStatistics();
                
            } else {
                createAlert('The AGM has already been finished. It cannot be finished again. The same statistics will be shown again!', 'danger');
            }
            
        });
    });

    $('a[href="#statistics"]').click(function() {

        setTimeout(async function() {
            if (!(await getIsFinished())) {
                $('main #statistic-sections').hide();
            } else {
                $('main #statistic-sections').show();
                $('main #statistic-info').hide();

                showStatistics();
            }
        }, 100)
    });

});

function showStatistics() {
    totalVotingCount = 0;
    setTimeout(async function() {
        for (var n = 0; n < await getNumOfProposals(); n++) {
            var executePropEntry = await executeProposal(n, getActiveUserAddress());
            executePropEntry = executePropEntry.logs[0].args;
            console.log(executePropEntry);
            var prop = mapProposal(await getProposal(n));
            console.log(prop);
            totalVotingCount += prop.proposalCount;
            var data = {};
            $('main #canvas-list').append(
                `
                <li>
                    <h3>${n+1}. Proposal    Proposal name: ${prop.proposalName}   Proposal vote sum: ${prop.proposalCount}</h3>
                    <canvas id="voteCountCanvas-${n}"></canvas>
                    <div id="myLegend-${n}"></div>
                </li>
                `
            );
            var voteCountCanvas = $(`main #voteCountCanvas-${n}`)[0];
            console.log('voteCountCanvas: ');
            console.log(voteCountCanvas);
            //console.log(document.getElementById('voteCountCanvas'));
            var colors = ["#fde23e","#f16e23", "#57d9ff","#937e88", "#5ad75a", "#d75ad7", "#ffffff"];
            var optionParts = prop.options.split(',');
            optionParts.forEach(function(val) {val.trim()});
            var numOfVotOptPerProposal = optionParts.length + 1;
            console.log('numOfVotOptPerProposal: ' + numOfVotOptPerProposal);
            var usedColors = colors.slice(0, numOfVotOptPerProposal);
            
            for (var i = 0; i < numOfVotOptPerProposal; i++) {
                var votingOptionEntry = await getVotingOption(i);
                console.log(votingOptionEntry);
                data[votingOptionEntry[0]] = votingOptionEntry[1].toNumber();
            }
            
            var myLegend = $(`#myLegend-${n}`)[0];
            console.log('myLegend: ' + myLegend);
            console.log('data: ');
            console.log(data);
            console.log('usedColors: ' + usedColors);
            if (prop.proposalPassed) {
                createPiechart(voteCountCanvas, data, usedColors, myLegend, executePropEntry.winnOptCount.toNumber()); 
            }
        }
        console.log('numOfVotingSh: ' + await getNumOfVotingShareholders());

        for (var i = 0; i < await getNumOfVotingShareholders(); i++) {
            var votingSharehEntry = await getWeightOfShareholder(i);
            if (!votingShareholders.includes(votingSharehEntry[0])) {
                shareholdersSortedByWeight.push({ adr: votingSharehEntry[0], weight: votingSharehEntry[1].toNumber() })
                //console.log(votingSharehEntry);
                votingShareholders.push(votingSharehEntry[0]);
            }
        }
        //console.log(shareholdersSortedByWeight);
        shareholdersSortedByWeight.sort(function (sh1, sh2) { 
            if (sh1.weight > sh2.weight) {
                return -1;
            }
            if (sh1.weight < sh2.weight) {
                return 1;
            }
            return 0;
            //sh2.weight - sh1.weight 
        });
        //console.log(shareholdersSortedByWeight);
        shareholdersSortedByWeight.slice(0, 50);
        for (var b = 0; b < shareholdersSortedByWeight.length; b++) {
            var selOpt = '';
            //var currAdr = shareholdersSortedByWeight[b].adr
            /*for (var f = 0; f < (await getShareholderWithOptionLength(currAdr)).toNumber(); f++) {
                selOpt += await getShareholderWithOption(currAdr, f) + ', ';
            }*/
            $('main #shareTable').append(
                `<tr>
                    <td>${shareholdersSortedByWeight[b].adr}</td>
                    <!--<td>${selOpt}</td>-->
                    <td>${shareholdersSortedByWeight[b].weight}</td>
                </tr>`
            );
        }
        $('main #total-vote-count').html(totalVotingCount);
        //$('main #total-vote-count').html((await getTotalVoteCount()).toNumber());
    }, 100);
}

function createPiechart(canvas, data, colors, legend, winnCount) {
    var piechart = new Piechart(
        {
            canvas: canvas,
            data: data,
            colors: colors,
            legend: legend,
            winnCount: winnCount
        }
    );
    piechart.draw();
}


var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    
    this.draw = function() {
        var legendHTML = "";
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data) {
            var val = this.options.data[categ];
            total_value += val;
        }
 
        var start_angle = 0;
        for (categ in this.options.data) {
            val = this.options.data[categ];
            var isWinnOpt = occurenceOfWinnOptCountOnlyOnce(this.options.winnCount, this.options.data) && isWinningOption(val, this.options.data);
            legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + (isWinnOpt ? '#ff0000' : this.colors[color_index]) + ";'>&nbsp;</span> " + categ + "</div>";

            /*console.log('occ: ' + occurenceOfWinnOptCountOnlyOnce(this.options.winnCount, this.options.data));
            console.log('isWin: ' + isWinningOption(val, this.options.data));
            console.log(this.options.data);
            console.log(this.options.winnCount);*/
            var slice_angle = 2 * Math.PI * val / total_value;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length],
                isWinnOpt
            );
 
            start_angle += slice_angle;
            color_index++;
        }

        
        start_angle = 0;
        for (categ in this.options.data) {
            val = this.options.data[categ];
            slice_angle = 2 * Math.PI * val / total_value;
            var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
            var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
        
            /*if (this.options.doughnutHoleSize){
                var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
                labelX = this.canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
                labelY = this.canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);               
            }*/
        
            var labelText = Math.round(100 * val / total_value);
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(labelText+"%", labelX,labelY);
            start_angle += slice_angle;
        }

        /*color_index = 0;
        
        for (categ in this.options.data) {
        }*/
        this.options.legend.innerHTML = legendHTML;
 
    }
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color, isWinnOpt){
    //console.log('isWinnOpt: ' + isWinnOpt)
    isWinnOpt ? ctx.fillStyle = '#ff0000' : ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function occurenceOfWinnOptCountOnlyOnce(winnOptCount, data) {
    var count = 0;
    var values = Object.values(data);
    //console.log(values);
    for (var i = 0; i < values.length; i++) {
        if (values[i] === winnOptCount) {++count}
    }

    if (count === 1) {
        return true
    } else {
        return false;
    } 
     
}

function isWinningOption(val, data) {
    /*console.log(Object.values(data));
    console.log('val: ' + val);
    console.log('max: ' + Math.max(...Object.values(data)));*/
    return val === Math.max(...Object.values(data));
}