import {finishAGM, createProposal, addUser, removeUser, getUser, getNumOfUsers, getOwnerAddress, transferOwnership, getOwners, hasPermission, executeProposal} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress, createAlert, showView} from './authentication';
import {upload} from '../../provider/IPFSUploadProvider';
import {getNumOfVotingOptions, getVotingOption, getWeightOfShareholder, getNumOfVotingShareholders, getNumOfProposals, getTotalVoteCount, appendVotingOptionToProposal, getProposal} from '../../provider/ProposalProvider';
import {mapProposal} from './voting';
//import {Piechart} from './statistics';
//import {web3} from './index';

//const owner = web3Provider.eth.accounts[0];
//console.log('owner address: ' + owner);

var votingShareholders = [];
var propId = 0;

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
            for (var i = 0; i < parts.length; i++) {
                await appendVotingOptionToProposal(propId, parts[i].trim());
            }
            var txId = createProposal(propName, propHash, propOptions, activeUserAddress);
            if (txId.charAt(1) === 'x') {
                ++propId;
            }
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
            showView('statistics-link');
            await finishAGM(getActiveUserAddress());
            createAlert('The AGM was successfully finished');
            var proposalNum = await getNumOfProposals();
            console.log('proposalNum: ' + proposalNum); 
            //console.log(document.body);

            setTimeout(async function() {
                for (var n = 0; n < await getNumOfProposals(); n++) {
                    await executeProposal(n, getActiveUserAddress());
                    var prop = mapProposal(await getProposal(n));
                    console.log(prop);
                    var data = {};
                    $('main #canvas-list').append(
                        `
                        <li>
                            <h3>${n+1}. Proposal    Proposal name: ${prop.proposalName}</h3>
                            <canvas id="voteCountCanvas-${n}"></canvas>
                            <div id="myLegend-${n}"></div>
                        </li>
                        `
                    )
                    var voteCountCanvas = $(`main #voteCountCanvas-${n}`)[0];
                    console.log('voteCountCanvas: ');
                    console.log(voteCountCanvas);
                    //console.log(document.getElementById('voteCountCanvas'));
                    var colors = ["#fde23e","#f16e23", "#57d9ff","#937e88", "#5ad75a", "#d75ad7", "#ffffff"];
                    var optionParts = prop.options.split(',');
                    optionParts.forEach(function(val) {val.trim()});
                    var numOfVotOptPerProposal = optionParts.length;
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
                    createPiechart(voteCountCanvas, data, usedColors, myLegend);
                    console.log('numOfVotingSh: ' + await getNumOfVotingShareholders());
                    
                    for (var i = 0; i < await getNumOfVotingShareholders(); i++) {
                        var votingSharehEntry = await getWeightOfShareholder(i);
                        
                        if (!votingShareholders.includes(votingSharehEntry[0])) {
                            //console.log(votingSharehEntry);
                            votingShareholders.push(votingSharehEntry[0]);
                            $('main #shareTable').append(
                                `<tr>
                                    <td>${votingSharehEntry[0]}</td>
                                    <td>${votingSharehEntry[1].toNumber()}</td>
                                </tr>`
                            );
                        }
                        
                    }
                }
                $('main #total-vote-count').html((await getTotalVoteCount()).toNumber());
            }, 100);
        });

    });

});

function createPiechart(canvas, data, colors, legend) {
    var piechart = new Piechart(
        {
            canvas: canvas,
            data: data,
            colors: colors,
            legend: legend
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
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data) {
            var val = this.options.data[categ];
            total_value += val;
        }
 
        var start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
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
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 20px Arial";
            this.ctx.fillText(labelText+"%", labelX,labelY);
            start_angle += slice_angle;
        }

        if (this.options.legend) {
            color_index = 0;
            var legendHTML = "";
            for (categ in this.options.data) {
                legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
            }
            this.options.legend.innerHTML = legendHTML;
        }
 
    }
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}