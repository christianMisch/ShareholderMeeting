import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
import {denominateVotingTokens, delegateToProxy, getVotingDenominations} from '../../provider/ShareholderProvider';

var numOfProp = 0;

$(document).ready(function() {

    $('a[href="#voting"]').click(function() {
        
        $('main').on('click', 'input[id="refresh-proposal"]', async function() {
            var proposalCount = await getNumOfProposals();
            
            if (numOfProp == proposalCount) {
                return;
            }
            numOfProp = proposalCount;
            console.log('proposalCount: ' + proposalCount);
            console.log('numOfProp: ' + numOfProp);
            
            for (var i = 0; i < proposalCount; i++) {
                var currProp = await getProposal(i);
                const mappedProp = mapProposal(currProp);
                const splits = mappedProp.options.split(',');
                var wrapper = $('<div></div>');
                for (var j = 0; j < splits.length; j++) {
                    var optionBut = $(
                        `<div>
                            <input type="radio" id="${splits[j]}" name="radio">
                            <label>${splits[j]}</label>
                        </div>`
                    );
                    wrapper.append(optionBut);
                }
                $('main table').append(
                    `<tr>
                        <td>${mappedProp.proposalDescription}</td>
                        <td>${wrapper.html()}</td>
                        <td>
                            <select>
                                <option value="simple">simple</option>
                                <option value="partial">partial</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" placeholder="0x...">
                        </td>
                    </tr>`
                );
            }            
        });

        $('main').on('click', 'input[id="denominate-button"]', async function() {
            const numOfBlocks = $('#block-number').val();
            const factor = $('#factor').val();
            await denominateVotingTokens(numOfBlocks, factor);
        });
    });

    /*setInterval(async function() {
        const denomArr = await getVotingDenominations();
        console.log(denomArr);
    }, 3000)*/

});

function mapProposal(propArr) {
    return {
        proposalId: propArr[0].toNumber(),
        proposalName: propArr[1],
        proposalDescription: propArr[2],
        options: propArr[3],
        proposalPassed: propArr[4],
        proposalPercent: propArr[5],
        proposalCount: propArr[6],
    }
}




