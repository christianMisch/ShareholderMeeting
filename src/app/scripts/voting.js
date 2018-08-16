import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';

$(document).ready(function() {

    $('a[href="#voting"]').click(function() {
        
        $('main').on('click', 'input[id="refresh-proposal"]', function() {
            alert('refresh');
            var proposalCount = getNumOfProposals();
            console.log('count: ' + proposalCount);
            for (var i = 0; i < proposalCount; i++) {
                var currProp = getProposal(i);
                console.log(currProp);
            }
        });
    });

});




