import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
import {denominateVotingTokens, delegateToProxy, getVotingDenominations} from '../../provider/ShareholderProvider';
import {getShareholder, getNumOfShareholders, vote} from '../../provider/ShareholderProvider';
import {setUserShares, getActiveUserAddress, createAlert} from './authentication';

var numOfProp = 0;

$(document).ready(async function() {
    
  
  //console.log(getAuthorizedUsers());
    $('main').on('click', 'input[id ^= "deleg-butt-"]', function() {
        console.log($(this)[0].id);
        var delegButt = $(this)[0].id;
        delegateToProxy(, true, delegButt.substring(11));
    });

    $('a[href="#voting"]').click(async function() {
    
      const activeUserAdr = getActiveUserAddress();
      //console.log(users);
      //console.log(users[activeUser].shares);
      var user = mapShareholder(await getShareholder(activeUserAdr));
      
      setTimeout(function() {
        $('main #refresh-proposal').css('visibility', 'hidden');
        $('main strong[id="shares"]').html(user.shares);

        setInterval(async function() {
            var proposalCount = parseInt(await getNumOfProposals());
    
            if (numOfProp == proposalCount) {
                console.log('proposal count has not changed.');
                return;
            }
            numOfProp = proposalCount;
            //const e = new Event('click');
            console.log($('main #refresh-proposal'));
            $('main #refresh-proposal').trigger('click');
            //var propRefreshBut = document.getElementById('main input[id="refresh-proposal"]');
            //console.log(propRefreshBut);
            //propRefreshBut.dispatchEvent(e);
            console.log('proposalCount: ' + proposalCount);
            console.log('numOfProp: ' + numOfProp);
          }, 1000);

      }, 100);


        $('main').on('click', 'input[id="refresh-proposal"]', async function() {
            $('main table tr').not('tr[id="table-header"]').empty();
            var radioCount = 0;

            for (var i = 0; i < numOfProp; i++) {
                var currProp = await getProposal(i);
                const mappedProp = mapProposal(currProp);
                const splits = mappedProp.options.split(',');
                var wrapper = $('<div></div>');
                
                for (var j = 0; j < splits.length; j++) {
                    var optionBut = $(
                        `<div>
                            <label ><input type="radio" id="${splits[j]}" name="${radioCount}">${splits[j]}</label>
                        </div>`
                    );
                    wrapper.append(optionBut);
                }
                wrapper.append($(
                    `<div>
                        <label><input type="radio" id="abstain" name="${radioCount}">abstain</label>
                    </div>`
                ));
                ++radioCount;
                $('main table').append(
                    `<tr class="list-group-item-info">
                        <td>${mappedProp.proposalDescription}</td>
                        <td>${wrapper.html()}</td>
                    </tr>`
                );
            }

            console.log(document.body);
        });

        $('main').on('click', 'input[id="vote-button"]', async function() {
            const activeUserAdr = getActiveUserAddress();
            console.log($('main input[type="radio"]:checked'));
            var selectedOptions = $('main input[type="radio"]:checked');
            console.log('length: ' + selectedOptions.length);
            if (selectedOptions.length === 0) {
                createAlert('You did not choose any option.', 'danger');
                console.log('no options selected')
                return;
            }
            
            for (var l = 0; l < selectedOptions.length; l++) {
                /*console.log(selectedOptions[l]);
                console.log(parseInt(selectedOptions[l].name));
                console.log(selectedOptions[l].nextSibling.data.trim());*/
                vote(parseInt(selectedOptions[l].name), selectedOptions[l].nextSibling.data.trim(), activeUserAdr);
            }
        });

        $('main').on('click', 'input[id="denominate-button"]', async function() {
            const numOfBlocks = parseInt($('#block-number').val());
            const factor = parseInt($('#factor').val());
            console.log('typeof factor: ' + typeof(factor));
            const txId = await denominateVotingTokens(numOfBlocks, factor, getActiveUserAddress());
            console.log(txId);
            if (!(txId.charAt(1) === 'x')) {
                createAlert('You do not own enough shares!', 'danger');
                return;
            }
            var shareholder = mapShareholder(await getShareholder(getActiveUserAddress()));
            $('#shares').html(shareholder.shares);
            const denomList = $('<ol class="list-group"></ol>');
            for (var i = 1; i <= numOfBlocks; i++) {
                denomList.append($(
                    `<li class="list-group-item list-group-item-primary" id="${i}">
                        ${i}. share block:  ${factor}
                        <input type="text" id=""
                        <input type="button" value="delegate" id="deleg-butt-${i}"></input>
                    </li>`
                ));
            }
            /*
              <ol>
                <li id="first">1. shareblock:  5 <input id="deleg-butt-first"></input></li>
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
            const txId = await delegateToProxy(proxyAdr, delegStyle, blockIndex, getActiveUserAddress());
            if (txId.charAt(1) === 'x') {
                $(`main li[id="${blockIndex}"]`).remove();
            }
            
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
