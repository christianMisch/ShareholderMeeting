import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
import {denominateVotingTokens, delegateToProxy, getVotingDenominations} from '../../provider/ShareholderProvider';
import {getShareholder, getNumOfShareholders, vote} from '../../provider/ShareholderProvider';
import {setUserShares, getActiveUserAddress, createAlert} from './authentication';
//import {downloadString} from '../../provider/IPFSDownloadProvider';
var  IPFSDownloadProvider = require('../../provider/IPFSDownloadProvider.js'); 

var votingInterval;
var numOfProp = 0;
// logout and login proposals not shown
$(document).ready(async function() {
    
  
  //console.log(getAuthorizedUsers());
    $('main').on('click', 'input[id ^= "deleg-butt-"]', async function() {
        var inpButt = $(this);
        console.log(inpButt[0].parentElement.innerText.substring(16,17));
        var delegButt = $(this)[0].id;
        var blockIndex = parseInt(delegButt.substring(11));
        console.log(typeof(blockIndex));
        console.log('blockIndex: ' + blockIndex);
        var delegAddr = $(`main input[id="deleg-addr-${blockIndex}"]`).val();
        console.log('delegAddr: ' + delegAddr);
        var txId = await delegateToProxy(delegAddr, true, blockIndex, getActiveUserAddress());
        if (txId.charAt(1) === 'x') {
            $(`main li[id="${blockIndex}"]`).remove();
            createAlert(`You succesfully delegated ${inpButt[0].parentElement.innerText.substring(16,17).toString()} shares to the proxy address: ${delegAddr}`);
        }
    });

    $('a[href="#voting"]').click(async function() {
      numOfProp = 0;
      const activeUserAdr = getActiveUserAddress();
      //console.log(users);
      //console.log(users[activeUser].shares);
      var user = mapShareholder(await getShareholder(activeUserAdr));
      
      setTimeout(function() {
        $('main #refresh-proposal').css('visibility', 'hidden');
        $('main strong[id="shares"]').html(user.shares);

        votingInterval = setInterval(async function() {
            var proposalCount = parseInt(await getNumOfProposals());
    
            if (numOfProp == proposalCount) {
                console.log('proposal count has not changed.');
                console.log('numOfProp: ' + numOfProp);
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

      }, 1000);


        $('main').on('click', 'input[id="refresh-proposal"]', async function() {
            $('main table tr').not('tr[id="table-header"]').empty();

            //console.log('amount of tr elements: ' + $('main table tr').length);
            var radioCount = 0;
            console.log('refresh props num: ' + numOfProp);
            for (var i = 0; i < numOfProp; i++) {
                var currProp = await getProposal(i);
                const mappedProp = mapProposal(currProp);
                console.log(mappedProp.proposalHash);
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
                console.log('before download');
                console.log('prop hash: ' + mappedProp.proposalHash);
                var propDescription = await IPFSDownloadProvider.downloadString(mappedProp.proposalHash);
                console.log('after download');
                console.log('propDescription: ' + propDescription);
                ++radioCount;
                $('main table').append(
                    `<tr class="list-group-item-info">
                        <td>${propDescription}</td>
                        <td>${wrapper.html()}</td>
                    </tr>`
                );
            }

            //console.log(document.body);
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
                await vote(parseInt(selectedOptions[l].name), selectedOptions[l].nextSibling.data.trim(), activeUserAdr);
            }
        });

        $('main').on('click', 'input[id="denominate-button"]', async function() {
            const numOfBlocks = parseInt($('#block-number').val());
            const factor = parseInt($('#factor').val());
            console.log('typeof factor: ' + typeof(factor));
            const txId = await denominateVotingTokens(numOfBlocks, factor, getActiveUserAddress());
            //console.log(txId);
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
                        <label>Proxy address:<input type="text" id="deleg-addr-${i}"></label>
                        <input type="button" value="delegate" id="deleg-butt-${i}">
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
            //const delegStyle = $('#delegation-style').val();
            //console.log(typeof(delegStyle));
            const proxyAdr = $('#proxy-address').val();
            var shareholder = mapShareholder(await getShareholder(getActiveUserAddress()));
            var currShares = shareholder.shares;
            //const blockIndex = parseInt($('#block-index').val());
            const txId = await delegateToProxy(proxyAdr, false, 0, getActiveUserAddress());
            if (txId.charAt(1) === 'x') {
                shareholder = mapShareholder(await getShareholder(getActiveUserAddress()));
                $('#shares').html(shareholder.shares);
                //$(`main li[id="${blockIndex}"]`).remove();
                createAlert(`You succesfully delegated all your shares: ${currShares} to the proxy: ${proxyAdr}`)
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
        proposalHash: propArr[2],
        options: propArr[3],
        proposalPassed: propArr[4],
        proposalPercent: propArr[5].toNumber(),
        proposalCount: propArr[6].toNumber(),
    }
}

function mapShareholder(shArr) {
    return {
        userAddress: shArr[0],
        role: shArr[1].toNumber(),
        shares: shArr[2].toNumber()
    }
}

export function getVotingInterval() {
    return votingInterval;
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
