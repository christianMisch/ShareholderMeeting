import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';

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
                $('main table').append(
                    `<tr>
                        <td>${mappedProp.proposalDescription}</td>
                        <td>${mappedProp.options}</td>
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
    });

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




