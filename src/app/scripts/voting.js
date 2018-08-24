import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
import {denominateVotingTokens, delegateToProxy, getVotingDenominations} from '../../provider/ShareholderProvider';
import {getShareholder, getNumOfShareholders} from '../../provider/ShareholderProvider';
import {setUserShares, getActiveUserAddress} from './authentication';

var numOfProp = 0;

$(document).ready(async function() {
  
  //console.log(getAuthorizedUsers());

    $('a[href="#voting"]').click(async function() {

      setInterval(function() {
        var proposalCount = await getNumOfProposals();

        if (numOfProp == proposalCount) {
            return;
        }
        numOfProp = proposalCount;
        const e = new Event('click');
        var propRefreshBut = document.getElementById('main #refresh-proposal');
        propRefreshBut.dispatchEvent(e);
        console.log('proposalCount: ' + proposalCount);
        console.log('numOfProp: ' + numOfProp);
      }, 3000);
    
      const activeUserAdr = getActiveUserAddress();
      //console.log(users);
      //console.log(users[activeUser].shares);
      var user = mapShareholder(await getShareholder(activeUserAdr));
      
      setTimeout(function() {
        $('main #refresh-proposal').hide();
        $('main strong[id="shares"]').html(user.shares);
      }, 1000);


        $('main').on('click', 'input[id="refresh-proposal"]', async function() {
            

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
            const numOfBlocks = parseInt($('#block-number').val());
            const factor = parseInt($('#factor').val());
            console.log('typeof factor: ' + typeof(factor));
            const txId = await denominateVotingTokens(numOfBlocks, factor, getActiveUserAddress());
            console.log(txId);
            if (!(txId.charAt(1) === 'x')) {
                return;
            }
            var shareholder = mapShareholder(await getShareholder(getActiveUserAddress()));
            $('#shares').html(shareholder.shares);
            const denomList = $('<ol class="list-group"></ol>');
            for (var i = 1; i <= numOfBlocks; i++) {
                denomList.append($(`<li class="list-group-item list-group-item-primary id="${i}">${i}. share block:  ${factor}</li>`));
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

        $('main').on('click', 'input[id="delegate-button"]', async function() {
            const delegStyle = $('#delegation-style').val();
            console.log(typeof(delegStyle));
            const proxyAdr = $('#proxy-address').val();
            const blockIndex = parseInt($('#block-index').val());
            delegateToProxy(proxyAdr, delegStyle, blockIndex, getActiveUserAddress());

            $(`main li[id="${blockIndex}"]`).remove();
            //console.log(getActiveUserAddress());
            //console.log(typeof(getActiveUserAddress()));
            //const currShares = $('main strong[id="shares"]').html();
            //const sharesToDelegate = $(`li[id=${blockIndex}]`).html();
            //setUserShares( activeUser, (currShares - sharesToDelegate) );
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

function mapShareholder(shArr) {
    return {
        userAddress: shArr[0],
        role: shArr[1].toNumber(),
        shares: shArr[2].toNumber()
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
