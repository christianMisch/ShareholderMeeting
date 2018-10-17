import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
import {denominateVotingTokens, delegateToProxy, getShareholder, vote} from '../../provider/ShareholderProvider';
import {getActiveUserAddress, createAlert} from './authentication';
import {getUser} from '../../provider/AgmOwnerProvider';
import {mapUser} from './authentication';

/**
 * @summary contains the UI logic for simple and partial delegation style, share denomination and voting on proposals
 */

// refresh the page if new proposals get added
var votingInterval;
// current number of proposals
var numOfProp = 0;

$(document).ready(async function() {
  
    // invokes the partial delegation: delegate a specified share block to a proxy
    $('main').on('click', 'input[id ^= "deleg-butt-"]', async function() {
        var inpButt = $(this);
        var delegButt = $(this)[0].id;
        var blockIndex = parseInt(delegButt.substring(11));
        var delegAddr = $(`main input[id="deleg-addr-${blockIndex}"]`).val();
        var proxyUser = mapUser(await getUser(delegAddr));
        // only shareholders can delegate shares to a proxy
        if (proxyUser.role === 2 && proxyUser.isReg === true) {
            var txId = await delegateToProxy(delegAddr, true, blockIndex, getActiveUserAddress());
            if (txId.charAt(1) === 'x') {
                $(`main li[id="${blockIndex}"]`).remove();
                createAlert(`You succesfully delegated ${inpButt[0].parentElement.innerText.substring(16,17).toString()} shares to the proxy address: ${delegAddr}`);
            }
        } else {
            createAlert('Proxy is not a shareholder or is not a registered user!', 'danger');
        }
        
    });

    // start the interval for updating the current proposal count 
    $('a[href="#voting"]').click(async function() {
      numOfProp = 0;
      const activeUserAdr = getActiveUserAddress();
      var user = mapShareholder(await getShareholder(activeUserAdr));
      setTimeout(function() {
        $('main #refresh-proposal').css('visibility', 'hidden');
        $('main strong[id="shares"]').html(user.shares);

        votingInterval = setInterval(async function() {
            var proposalCount = parseInt(await getNumOfProposals());
            // check whether new proposals has been added
            if (numOfProp == proposalCount) {
                return;
            }
            // if so the current proposal count is updated
            numOfProp = proposalCount;
            // the proposal list is loaded again with all new proposals
            $('main #refresh-proposal').trigger('click');
          }, 1000);
      }, 1000);

        // refreshed the proposal list if the proposal related state changes
        $('main').on('click', 'input[id="refresh-proposal"]', async function() {
            $('main table tr').not('tr[id="table-header"]').empty();
            // specify that different voting options belong to a single proposal
            var radioCount = 0;
            // iterate over all proposals
            for (var i = 0; i < numOfProp; i++) {
                var currProp = await getProposal(i);
                const mappedProp = mapProposal(currProp);
                const splits = mappedProp.options.split(',');
                var wrapper = $('<div></div>');
                // iterate over all voting options of a specific proposal
                for (var j = 0; j < splits.length; j++) {
                    var optionBut = $(
                        `<div>
                            <label ><input type="radio" id="${splits[j]}" name="${radioCount}">${splits[j]}</label>
                        </div>`
                    );
                    wrapper.append(optionBut);
                }
                // the abstain option is autmatically added
                wrapper.append($(
                    `<div>
                        <label><input type="radio" id="abstain" name="${radioCount}">abstain</label>
                    </div>`
                ));
                var propDescription = mappedProp.proposalDescription;
                ++radioCount;
                // append a proposal entry to the table including the description and all voting options
                $('main table').append(
                    `<tr class="list-group-item-info">
                        <td>${propDescription}</td>
                        <td>${wrapper.html()}</td>
                    </tr>`
                );
            }
        });

        // invokes the voting logic in the contract and does additional validation
        $('main').on('click', 'input[id="vote-button"]', async function() {
            const activeUserAdr = getActiveUserAddress();
            var selectedOptions = $('main input[type="radio"]:checked');
            // the shareholder has to select at least one voting option
            if (selectedOptions.length === 0) {
                createAlert('You did not choose any option.', 'danger');
                return;
            }
            var txId;
            for (var l = 0; l < selectedOptions.length; l++) {
                // each selected radio button per proposal represents one vote including the proposal id and selected option
                txId = await vote(parseInt(selectedOptions[l].name), selectedOptions[l].nextSibling.data.trim(), activeUserAdr);
            }
            if (txId.charAt(1) === 'x') {
                createAlert('You successfully casted your votes!');
            } else {
                createAlert('You have already voted!', 'danger');
            }
        });

        // invokes the denomination logic in the contract
        $('main').on('click', 'input[id="denominate-button"]', async function() {
            const numOfBlocks = parseInt($('#block-number').val());
            const factor = parseInt($('#factor').val());
            const txId = await denominateVotingTokens(numOfBlocks, factor, getActiveUserAddress());
            // if no TX hash is returned then the TX was not successfull
            if (!(txId.charAt(1) === 'x')) {
                createAlert('You do not own enough shares!', 'danger');
                return;
            }
            var shareholder = mapShareholder(await getShareholder(getActiveUserAddress()));
            $('#shares').html(shareholder.shares);
            const denomList = $('<ol class="list-group"></ol>');
            // appends share blocks to the denomination list in the UI with a specific weight depending on the given params
            for (var i = 1; i <= numOfBlocks; i++) {
                denomList.append($(
                    `<li class="list-group-item list-group-item-primary" id="${i}">
                        ${i}. share block:  ${factor}
                        <label>Proxy address:<input type="text" id="deleg-addr-${i}"></label>
                        <input type="button" value="delegate" id="deleg-butt-${i}">
                    </li>`
                ));
            }
            $('main div[id="voting-denomination-list"]').append(denomList.html());
        });

        // invokes the simple delegation logic in the Shareholder contract meaning that all shares get delegated
        $('main').on('click', 'input[id="delegate-button"]', async function() {
            const proxyAdr = $('#proxy-address').val();
            var shareholder = mapShareholder(await getShareholder(getActiveUserAddress()));
            var currShares = shareholder.shares;
            var proxyUser = mapUser(await getUser(proxyAdr));
            // only registered shareholders can delegate
            if (proxyUser.role === 2 && proxyUser.isReg === true) {
                const txId = await delegateToProxy(proxyAdr, false, 0, getActiveUserAddress());
                if (txId.charAt(1) === 'x') {
                    shareholder = mapShareholder(await getShareholder(getActiveUserAddress()));
                    $('#shares').html(shareholder.shares);
                    createAlert(`You succesfully delegated all your shares: ${currShares} to the proxy: ${proxyAdr}`)
                }
            } else {
                createAlert('Proxy is not a shareholder or is not a registered user!', 'danger');
            }
        });
    });

    // invokes the proposal creation logic in the AgmOwner contract
    $('main').on('click', 'input[id="proposal-creator-button"]', async function() {
        const activeUserAddress = getActiveUserAddress();
        // the caller should have admin rights
        if (!(await getOwners()).includes(activeUserAddress)) {
            createAlert('You have currently no permission to setup the AGM', 'danger');
            return;
        }
        const propName = $('#proposal-name').val();
        const propDescription = $('#proposal-description').val();
        var propHash = await upload(propDescription);
        const propOptions = $('#proposal-options').val();
        const parts = propOptions.split(',');
        var propId = (await getPropId()).toNumber();
        // iterate over all voting options and append them to the proposal Id => options mapping
        for (var i = 0; i < parts.length; i++) {
            await appendVotingOptionToProposal(propId, parts[i].trim(), activeUserAddress);
        }
        // abstain is also automatically added in the contract
        await appendVotingOptionToProposal(propId, 'abstain', activeUserAddress);
        await createProposal(propName, propHash, propOptions, activeUserAddress);
        // to ensure that the next proposal's options are not stored together with the previous proposal
        await incrementPropId(activeUserAddress);
    });
});

export function mapProposal(propArr) {
    return {
        proposalId: propArr[0].toNumber(),
        proposalName: propArr[1],
        proposalDescription: propArr[2],
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