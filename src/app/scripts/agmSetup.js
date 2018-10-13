import {finishAGM, addUser, removeUser, getNumOfUsers, transferOwnership, getOwners, executeProposal, getIsFinished, getUser} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress, createAlert, showView, mapUser} from './authentication';
import {getVotingOption, getWeightOfShareholder, getNumOfVotingShareholders, getNumOfProposals, getProposal} from '../../provider/ProposalProvider';
import {mapProposal} from './voting';

/**
 * @summary this file provides functions for the implementation of the AGM setup process in the UI and includes following features:
 *          - create a proposal
 *          - add/remove a user
 *          - transfer admin rights to another director
 *          - finish/announce AGM 
 */

// total voting count of all proposals
var totalVotingCount = 0;
// stores only shareholders who casted their vote
var votingShareholders = [];
// sorts the shareholder list by number of shares descending
var shareholdersSortedByWeight = [];

$(document).ready(function() {

    $('a[href="#setup"]').click(function() {
        // event delegation in jquery => event handler can be registered also if the specified template is not loaded
        $('main').on('click', 'input[id="add-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newUserAddress = $('#new-user-address').val().toLowerCase();
            const role = parseInt($('#director-flag').val());
            const numOfShares = parseInt($('#num-of-shares').val());
            // role == 2 means that he is a shareholder
            if (role !== 2 && numOfShares > 1) {
                createAlert('Only a shareholder can own shares. Please set a 0 if the user is not a shareholder!', 'danger');
                return;
            }
            addUser(newUserAddress, role, numOfShares, activeUserAddress);
        });

        $('main').on('click', 'input[id="remove-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress().toLowerCase();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const adrOfRemovedUser = $('#remove-user-address').val().toLowerCase();
            // verification that the user exists is checked in the contract
            removeUser(adrOfRemovedUser, activeUserAddress);
        });
        
        $('main').on('click', 'input[id="transfer-ownership-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newOwnerAddress = $('#ownership-address').val().toLowerCase();
            // role === 3 => user is not registered
            if ( (mapUser(await getUser(newOwnerAddress))).role === 3 ) {
                createAlert('Proxy is not a registered user!', 'danger');
                return;
            }
            await transferOwnership(newOwnerAddress, activeUserAddress);
        });

        $('main').on('click', '#finish-AGM-button', async function() {
            if (!(await getIsFinished())) {
                showView('statistics-link');
                await finishAGM(getActiveUserAddress());
                createAlert('The AGM was successfully finished');
                // trigger the voting evaluation
                showStatistics(); 
            } else {
                createAlert('The AGM has already been finished. It cannot be finished again. The same statistics will be shown again!', 'danger');
            }
        });
    });

    $('a[href="#statistics"]').click(function() {
        // wait 100ms that the template content is loaded into the DOM
        setTimeout(async function() {
            if (!(await getIsFinished())) {
                $('main #statistic-sections').hide();
            } else {
                // show only the info page if the main admin did not finish the AGM
                $('main #statistic-sections').show();
                $('main #statistic-info').hide();
                showStatistics();
            }
        }, 100)
    });
});

/**
 * @function showStatistics renders a piechart for every proposal and a table including voters
 *           - the piechart shows the tally of each voting option for a specific proposal
 *           - a table is rendered with showing the 50 biggerst shareholders sorted by their weight 
 */
function showStatistics() {
    // of all proposals
    totalVotingCount = 0;
    setTimeout(async function() {
        for (var n = 0; n < await getNumOfProposals(); n++) {
            // all proposals get executed
            var executePropEntry = await executeProposal(n, getActiveUserAddress());
            // proposals data is stored in an event triggered by the contract
            executePropEntry = executePropEntry.logs[0].args;
            var prop = mapProposal(await getProposal(n));
            // only if the proposal satisfies the quorum the vote count is added
            if (prop.proposalPassed) {
                totalVotingCount += prop.proposalCount;
                var data = {};
                // create a html canvas tag
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
                // different colors for every slice of the proposal piechart representing a specific voting option
                var colors = ["#fde23e","#f16e23", "#57d9ff","#937e88", "#5ad75a", "#d75ad7", "#ffffff"];
                var optionParts = prop.options.split(',');
                optionParts.forEach(function(val) {val.trim()});
                // abstain was not included so far => + 1
                var numOfVotOptPerProposal = optionParts.length + 1;
                var usedColors = colors.slice(0, numOfVotOptPerProposal);
                
                for (var i = 0; i < numOfVotOptPerProposal; i++) {
                    // all voting options of all proposals are retrieved from the Factory contract
                    // in the next iteration the voting options of the previous proposal gets overwritten in the contract
                    var votingOptionEntry = await getVotingOption(i);
                    console.log(votingOptionEntry);
                    data[votingOptionEntry[0]] = votingOptionEntry[1].toNumber();
                }
                
                var myLegend = $(`#myLegend-${n}`)[0];
                // render the piechart
                createPiechart(voteCountCanvas, data, usedColors, myLegend, executePropEntry.winnOptCount.toNumber());
            }    
        }
        for (var i = 0; i < await getNumOfVotingShareholders(); i++) {
            var votingSharehEntry = await getWeightOfShareholder(i);
            if (!votingShareholders.includes(votingSharehEntry[0])) {
                shareholdersSortedByWeight.push({ adr: votingSharehEntry[0], weight: votingSharehEntry[1].toNumber() })
                // votingShareholders are used to remember which shareholder has voted and to avoid duplicates in the sorted list
                votingShareholders.push(votingSharehEntry[0]);
            }
        }
        shareholdersSortedByWeight.sort(function (sh1, sh2) { 
            if (sh1.weight > sh2.weight) {
                return -1;
            }
            if (sh1.weight < sh2.weight) {
                return 1;
            }
            return 0;
        });
        // get only the first 50 shareholders
        shareholdersSortedByWeight.slice(0, 50);
        for (var b = 0; b < shareholdersSortedByWeight.length; b++) {
            var selOpt = '';
            // append the address and weight of a specific shareholder to a table entry
            $('main #shareTable').append(
                `<tr>
                    <td>${shareholdersSortedByWeight[b].adr}</td>
                    <!--<td>${selOpt}</td>-->
                    <td>${shareholdersSortedByWeight[b].weight}</td>
                </tr>`
            );
        }
        $('main #total-vote-count').html(totalVotingCount);
    }, 100);
}

/**
 * @function createPiechart - creates a piechart for a proposal
 * @param {Object} canvas - a specific jQuery canvas object 
 * @param {Object[]} data - containing objects with voting option name and corresponding count 
 * @param {string[]} colors - containing the same number of different colors as different voting options exist for a proposal
 * @param {Object} legend - the specific jQuery legend object 
 * @param {integer} winnCount - the number of votes for a voting option for which most of the shareholders voted
 */
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

// Piechart contructor
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
            // to identify which voting option has most of the votes => if so the voting option is marked red
            var isWinnOpt = occurenceOfWinnOptCountOnlyOnce(this.options.winnCount, this.options.data) && isWinningOption(val, this.options.data);
            // the legend to the corresponding voting option is created
            legendHTML += "<div><span style='display:inline-block;width:20px;background-color:" + (isWinnOpt ? '#ff0000' : this.colors[color_index]) + ";'>&nbsp;</span> " + categ + "</div>";
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
        // categ = voting option
        for (categ in this.options.data) {
            val = this.options.data[categ];
            slice_angle = 2 * Math.PI * val / total_value;
            var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
            var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
            var labelText = Math.round(100 * val / total_value);
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 20px Arial";
            // write the vote fraction in the corect piechart slice
            this.ctx.fillText(labelText+"%", labelX,labelY);
            start_angle += slice_angle;
        }
        this.options.legend.innerHTML = legendHTML;
    }
}

/**
 * @function drawPieSlice - create the slice of a specific piechart
 * @param {CanvasRenderingContext2D} ctx - the context of the piechart which shall be rendered 
 * @param {integer} centerX - x coordinate represents the width of the piechart slice 
 * @param {integer} centerY - y coordinate represents the height of the piechart slice  
 * @param {integer} radius - the radius of the piechart slice 
 * @param {integer} startAngle - the start angle of the slice 
 * @param {integer} endAngle - the end angle of the slice
 * @param {string} color - the used color 
 * @param {boolean} isWinnOpt - indicates whether this voting option has most of the votes 
 */
function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color, isWinnOpt){
    isWinnOpt ? ctx.fillStyle = '#ff0000' : ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

/**
 * @function occurenceOfWinnOptCountOnlyOnce check that the voting options with most of the votes exists only once
 * @param {integer} winnOptCount - number of votes for the winning option 
 * @param {Object[]} data - includes all voting options with their count 
 */
function occurenceOfWinnOptCountOnlyOnce(winnOptCount, data) {
    var count = 0;
    var values = Object.values(data);
    for (var i = 0; i < values.length; i++) {
        if (values[i] === winnOptCount) {++count}
    }
    if (count === 1) {
        return true
    } else {
        return false;
    } 
}

/**
 * @function isWinningOption check that the specific option count has most of the votes
 * @param {integer} val - is compared with the highest vote count 
 * @param {Object[]} data - contains all voting options and their counts 
 */
function isWinningOption(val, data) {
    /*console.log(Object.values(data));
    console.log('val: ' + val);
    console.log('max: ' + Math.max(...Object.values(data)));*/
    return val === Math.max(...Object.values(data));
}