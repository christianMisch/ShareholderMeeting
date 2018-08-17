import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
import {denominateVotingTokens, delegateToProxy, getVotingDenominations} from '../../provider/ShareholderProvider';
import {getAuthorizedUsers, setAuthorizedUsers, getActiveUserAddress} from './authentication';

var numOfProp = 0;
var flag = true;
var users = getAuthorizedUsers();

$(document).ready(function() {
  console.log(getAuthorizedUsers());

    $('a[href="#voting"]').click(function() {
      const activeUser = getActiveUserAddress();
      console.log(users);
      console.log(users[activeUser].shares);
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
            //await denominateVotingTokens(numOfBlocks, factor);
            const denom = $(
              `<ol>
                <li id="first">1. shareblock:  5</li>
                <li id="second">2. shareblock:  5</li>
                <li>3. shareblock:  5</li>
              <ol>`
            );
            $('main div[id="voting-denomination-list"]').append(denom.html());
        });

        $('main').on('click', 'input[id="delegate-button"]', function() {

          users['0'].shares -= 5;
          if (flag) {
            users['0x628FBd5a122103e8171BbB2dC70C265f9F775466'].shares += 5;
            $('main li[id="first"]').remove();
          } else {
            users['0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655'].shares += 5;
            $('main li[id="second"]').remove();
          }
          flag = false;
          $('#shares').html(users['0'].shares);
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
