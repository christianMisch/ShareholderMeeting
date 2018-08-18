import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
import {denominateVotingTokens, delegateToProxy, getVotingDenominations} from '../../provider/ShareholderProvider';
import {getAuthorizedUsers, setAuthorizedUsers, getActiveUserAddress} from './authentication';

var numOfProp = 0;
var users = getAuthorizedUsers();

$(document).ready(function() {
  console.log(getAuthorizedUsers());

    $('a[href="#voting"]').click(function() {
      const activeUser = getActiveUserAddress();
      //console.log(users);
      //console.log(users[activeUser].shares);
      setTimeout(function() {
        $('main strong[id="shares"]').html(users[activeUser].shares);
      }, 1000);


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
                    </tr>`
                );
            }
        });

        $('main').on('click', 'input[id="denominate-button"]', async function() {
            const numOfBlocks = $('#block-number').val();
            const factor = $('#factor').val();
            await denominateVotingTokens(numOfBlocks, factor, {from: '0x5E3407E44756371B4D3De80Eb4378b715c444619'});

            const denomList = $('<ol></ol>');
            for (var i = 1; i <= numOfBlocks; i++) {
                denomList.append($(`<li id="${i}">${i}. share block:  ${factor}</li>`));
            }
            /*
              <ol>
                <li id="first">1. shareblock:  5</li>
                <li id="second">2. shareblock:  5</li>
                <li>3. shareblock:  5</li>
              <ol>
            */
            $('main div[id="voting-denomination-list"]').append(denomList.html());
        });

        $('main').on('click', 'input[id="delegate-button"]', function() {
            const delegStyle = $('delegation-style').val();
            const proxyAdr = $('#proxy-address').val();
            const blockIndex = $('#block-index').val();
            delegateToProxy(proxyAdr, delegStyle, blockIndex);

            $(`main li[id="${blockIndex}"]`).remove();
            //console.log(getActiveUserAddress());
            //console.log(typeof(getActiveUserAddress()));
            const currShares = $('main strong[id="shares"]').html();
            const sharesToDelegate = $(`li[id=${blockIndex}]`).html();
            setAuthorizedUsers( activeUser, (currShares - sharesToDelegate) );
            $('#shares').html(users[`${getActiveUserAddress()}`].shares);
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

/*
<td>
    <select>
        <option value="simple">simple</option>
        <option value="partial">partial</option>
    </select>
</td>
<td>
    <input type="text" placeholder="0x...">
</td>
*/
