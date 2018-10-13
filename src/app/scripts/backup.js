//import { getUserList, getNumOfUsers } from "../../provider/AgmOwnerProvider";

/*import web3Provider from '../../provider/web3Provider';

console.log('web3 accounts: ');
console.log(web3Provider.eth.accounts);*/

/*var authorizedUsers = {
    '0x011Fc7b12E5EEd718680db16a125378a25ac4b2F': {role: 'AgmOwner', loggedIn: false},
    '0xd02Dc75c5D17021a71060DeE44b12958fBa069FB': {role: 'AgmOwner', loggedIn: false},
    '0': {role: 'Shareholder', loggedIn: false, shares: 20},
    '0x628FBd5a122103e8171BbB2dC70C265f9F775466': {role: 'Shareholder', loggedIn: false, shares: 30},
    '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655': {role: 'Shareholder', loggedIn: false, shares: 45},
    '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1': {role: 'Shareholder', loggedIn: false, shares: 12},
    '0x5E3407E44756371B4D3De80Eb4378b715c444619': {role: 'Shareholder', loggedIn: false, shares: 34},
    '0x88D7d45b3eBD3Fd8b202D8BF1Ec8e2CC2006692D': {role: 'Director', loggedIn: false}
};*/

// var inputAdr;

// $(document).ready(async function() {
//     authorizedUsers[`${web3Provider.eth.accounts[0].toLowerCase()}`] = {role: 'AgmOwner', loggedIn: false, shares: 0};
//     //console.log('Num of users should be 5: ' + await getNumOfUsers());
//     showWelcomePage();
//     // hide logout button, welcome link in sidebar and user credentials
//     $('#logout-button').hide();
//     $('nav').hide();

//     /*console.log('isAuthenticated');
//     isAuthenticated('0xbB0487c8aFdAcC15017201e3002dCC60DdDF9C67').then(function(result) {
//         console.log(result.logs);
//     });*/

//     hideUserCredentials();

//     /*const links = $('ul[class="list-unstyled components"] a');
//     console.log(links);
//     $.each(links, function(index, val) {
//         console.log(index, val);
//         //val.hide();
//         //$(`#${val.attr('id')}`).hide();
//     })*/

//     $('#login-button').click(async function(e) {
//         e.preventDefault();

//         const alertWrapper = $('<div id="wrapper"></div>');
//         $('footer').append(alertWrapper);
//         inputAdr = $('#wallet-address').val().toLowerCase();
//         //console.log(authorizedUsers);
//         console.log('getUserlist: ');
//         console.log(await getUserList());
//         if (Object.keys(authorizedUsers).includes(inputAdr)
//             && authorizedUsers[inputAdr].role === 'AgmOwner') {
//                 createAlert('You have successfully logged in as AgmOwner!');
//                 $('nav').show();
//                 $('#setup-link').show();
//                 $('#welcome-link').hide();
//                 $('#voting-link').hide();
//                 $('#qa-link').hide();
//                 showUserCredentials();
//                 $('#userAddress').html('User: ' + inputAdr);
//                 $('#userRole').html('Role: AgmOwner');
//                 showLogoutButton();
//                 showView('home-link');
//                 hideLoginFields();
//                 console.log(inputAdr);
//                 console.log(authorizedUsers);
//                 authorizedUsers[inputAdr].loggedIn = true;
//                 console.log('loggedIn as Owner');


//         } else if (Object.keys(authorizedUsers).includes(inputAdr)
//             && authorizedUsers[inputAdr].role === 'Shareholder') {

//                 createAlert('You have successfully logged in as Shareholder!');
//                 $('nav').show();
//                 $('#voting-link').show();
//                 $('#setup-link').hide();
//                 $('#welcome-link').hide();
//                 showUserCredentials();
//                 $('#userAddress').html('User: ' + inputAdr);
//                 $('#userRole').html('Role: Shareholder');
//                 showLogoutButton();
//                 showView('home-link');
//                 hideLoginFields();
//                 authorizedUsers[inputAdr].loggedIn = true;

//         } else if (Object.keys(authorizedUsers).includes(inputAdr)
//              && authorizedUsers[inputAdr].role === 'Director') {

//                 createAlert('You have successfully logged in as Director!');
//                 $('nav').show();
//                 $('#setup-link').hide();
//                 $('#welcome-link').hide();
//                 $('#voting-link').hide();
//                 showUserCredentials();
//                 $('#userAddress').html('User: ' + inputAdr);
//                 $('#userRole').html('Role: Director');
//                 showLogoutButton();
//                 showView('home-link');
//                 hideLoginFields();
//                 authorizedUsers[inputAdr].loggedIn = true;

//         } else {
//             $('#wrapper').append(`<div role="alert">Login failed!</div>`)
//                 .addClass('alert alert-danger');
//         }
//         //console.log($('#wrapper div').length);
//         removeSecondAlert();
//         //console.log($('#wrapper'));

//         //console.log(authorizedUsers);
//         setTimeout(function () {
//             $('.alert').alert('close');
//         }, 3000);
//     });

//     $('#logout-button').click(function() {
//         $('nav').hide();
//         $('#logout-button').hide();
//         $('#login-button').show();
//         showWelcomePage();
//         hideUserCredentials();
//         showLoginFields();
//         authorizedUsers[inputAdr].loggedIn = false;
//         //console.log(authorizedUsers);

//     });

// });

// export function createAlert(message, alertType = 'success') {
//     $('#wrapper').append(`<div role="alert">${message}</div>`)
//         .addClass(`alert alert-${alertType}`);
//     setTimeout(function () {
//         $('.alert').alert('close');
//     }, 3000);
//     /*if (alertType === 'danger') {
//         const aLinks = $('a');
//         for (var i = 0; i < aLinks.length; i++) {
//             if (aLinks[i].attr('class')) {
//                 $('a')[i].attr('class', '');
//             }
//         }
//     }*/
//     //$('a[href="#home"]').trigger('click');
// }


// function showUserCredentials() {
//     $('#userAddress').show();
//     $('#userRole').show();
// }

// function hideUserCredentials() {
//     $('#userAddress').hide();
//     $('#userRole').hide();
// }

// function hideLoginFields() {
//     $('#address-label').hide();
//     $('#password-label').hide();
// }

// function showLoginFields() {
//     $('#address-label').show();
//     $('#password-label').show();
// }

// function showView(viewName) {
//     const event = new Event('click');
//     const homeLink = document.getElementById(viewName);
//     homeLink.dispatchEvent(event);
// }

// function showLogoutButton() {
//     $('#logout-button').show();
//     $('#login-button').hide();
// }

// function showWelcomePage() {
//     const event = new Event('click');
//     const welcomeLink = document.getElementsByTagName('a')[0];
//     welcomeLink.dispatchEvent(event);
// }

// export function getActiveUserState() {
//     return authorizedUsers[inputAdr] || {loggedIn: false};
// }

// export function getActiveUserAddress() {
//     return inputAdr.toLowerCase();
// }

// export function removeSecondAlert() {
//     var numOfAlerts = $('#wrapper div').length;
//         if (numOfAlerts > 1) {
//             const wrapper = document.querySelector('#wrapper');
//             wrapper.removeChild(wrapper.lastChild);
//         }
// }

// export function getAuthorizedUsers() {
//   return authorizedUsers;
// }

// export function setUserShares(key, shares) {
//   authorizedUsers[key].shares = shares;
// }

// export function setAuthorizedUsers(adr, val) {
//     authorizedUsers[adr] = val;
// }

// async function isAuthenticated(address) {
//     const userList = await getUserList();
//     console.log('userList: ');
//     console.log(userList);
//     for (var i = 0; i < userList; i++) {
//         if (userList[i].userAddress === address) {
//             return true;
//         }
//     }
//     return false;
// }



// // start of voting.js

// import {getProposal, getNumOfProposals} from '../../provider/ProposalProvider';
// import {denominateVotingTokens, delegateToProxy, getVotingDenominations} from '../../provider/ShareholderProvider';
// import {getAuthorizedUsers, setUserShares, getActiveUserAddress} from './authentication';

// var numOfProp = 0;

// $(document).ready(function() {
//   //console.log(getAuthorizedUsers());

//     $('a[href="#voting"]').click(function() {
//       const activeUser = getActiveUserAddress();
//       //console.log(users);
//       //console.log(users[activeUser].shares);
//       var users = getAuthorizedUsers();
//       setTimeout(function() {
//         $('main strong[id="shares"]').html(users[activeUser].shares);
//       }, 1000);


//         $('main').on('click', 'input[id="refresh-proposal"]', async function() {
//             var proposalCount = await getNumOfProposals();

//             if (numOfProp == proposalCount) {
//                 return;
//             }
//             numOfProp = proposalCount;
//             console.log('proposalCount: ' + proposalCount);
//             console.log('numOfProp: ' + numOfProp);

//             for (var i = 0; i < proposalCount; i++) {
//                 var currProp = await getProposal(i);
//                 const mappedProp = mapProposal(currProp);
//                 const splits = mappedProp.options.split(',');
//                 var wrapper = $('<div></div>');
//                 for (var j = 0; j < splits.length; j++) {
//                     var optionBut = $(
//                         `<div>
//                             <input type="radio" id="${splits[j]}" name="radio">
//                             <label>${splits[j]}</label>
//                         </div>`
//                     );
//                     wrapper.append(optionBut);
//                 }
//                 $('main table').append(
//                     `<tr>
//                         <td>${mappedProp.proposalDescription}</td>
//                         <td>${wrapper.html()}</td>
//                     </tr>`
//                 );
//             }
//         });

//         $('main').on('click', 'input[id="denominate-button"]', async function() {
//             const numOfBlocks = $('#block-number').val();
//             const factor = $('#factor').val();
//             await denominateVotingTokens(numOfBlocks, factor, {from: '0x5E3407E44756371B4D3De80Eb4378b715c444619'});

//             const denomList = $('<ol></ol>');
//             for (var i = 1; i <= numOfBlocks; i++) {
//                 denomList.append($(`<li id="${i}">${i}. share block:  ${factor}</li>`));
//             }
//             /*
//               <ol>
//                 <li id="first">1. shareblock:  5</li>
//                 <li id="second">2. shareblock:  5</li>
//                 <li>3. shareblock:  5</li>
//               <ol>
//             */
//             $('main div[id="voting-denomination-list"]').append(denomList.html());
//         });

//         $('main').on('click', 'input[id="delegate-button"]', function() {
//             const delegStyle = $('delegation-style').val();
//             const proxyAdr = $('#proxy-address').val();
//             const blockIndex = $('#block-index').val();
//             delegateToProxy(proxyAdr, delegStyle, blockIndex);

//             $(`main li[id="${blockIndex}"]`).remove();
//             //console.log(getActiveUserAddress());
//             //console.log(typeof(getActiveUserAddress()));
//             var users = getAuthorizedUsers();
//             const currShares = $('main strong[id="shares"]').html();
//             const sharesToDelegate = $(`li[id=${blockIndex}]`).html();
//             setUserShares( activeUser, (currShares - sharesToDelegate) );
//             $('#shares').html(users[`${getActiveUserAddress()}`].shares);
//         });
//     });

//     /*setInterval(async function() {
//         const denomArr = await getVotingDenominations();
//         console.log(denomArr);
//     }, 3000)*/

// });

// function mapProposal(propArr) {
//     return {
//         proposalId: propArr[0].toNumber(),
//         proposalName: propArr[1],
//         proposalDescription: propArr[2],
//         options: propArr[3],
//         proposalPassed: propArr[4],
//         proposalPercent: propArr[5],
//         proposalCount: propArr[6],
//     }
// }

// /*
// <td>
//     <select>
//         <option value="simple">simple</option>
//         <option value="partial">partial</option>
//     </select>
// </td>
// <td>
//     <input type="text" placeholder="0x...">
// </td>
// */


/*function getDelegate(uint delegateId) public view returns (address _proxyAddress, uint _votingWeight) {
        Delegate storage deleg = delegations[delegateId];
        return (deleg.proxy, deleg.votingWeight);
    }*/

    /*function getNumOfDelegations() public view returns (uint length) {
        return delegations.length;
    }*/

    /*function getNumOfVotingDenominations() public view returns (uint length) {
        return votingDenominations.length;
    }*/

    /*function getVotingDenominations() public view returns (uint[] denominations) {
        return votingDenominations;
    }*/


    ///Factory.sol

    /*function getShareholderWithOption(address shAdr, uint optId) public view returns (string _opt) {
        Shareholder sh = shareholders[shAdr];
        return sh.selectVotOptions(optId);
    }

    function getShareholderWithOptionLength(address shAdr) public view returns (uint length) {
        var sh = shareholders[shAdr];
        return sh.getNumOfSelectVotOptions();
    }*/

    /*function getNumOfShareholders() public view returns (uint length) {
        return shareholders.length;
    }*/

    /*function getShareholderList() public view returns (Shareholder[]) {
        return shareholders;
    }*/

    //require(isFinished, "meeting has not finished yet");
        // iterate over all options to store default options in the array
        /*for (uint k = 0; k < propOptions.length; k++) {
            uint id = votingOptions.length++;
            votingOptions[id] = VotingOption({optionName: propOptions[k], optionCount: 0});
            // iterate over all votes of all proposals to check which voter voted for option k
            for (uint l = 0; l < proposals.length; l++) {
                Proposal storage prop = proposals[l];
                for (uint i = 0; i < prop.votes.length; i++) {
                    Vote storage v = prop.votes[i];
                    if (utilCompareInternal(v.voterDecision, propOptions[k])) {
                        votingOptions[k].optionCount++;
                    }
                }  
            }
        }*/

// Shareholder.sol

        // if shareholder voted on any proposal he cannot delegate his VP to a proxy anymore
        // delegation
        //require(proxyAddress != msg.sender, "Self-delegation is not allowed");
        //require(userExists(proxyAddress), "Proxy is not a registered user");
        //require(userExists(msg.sender), "the user account is not registered");
        //require(delegate == address(0), "user already has delegated to another proxy");

        // deletes the entry with swapping elements if required
            /*for (; voteBlockIndex < votingDenominations.length - 1; voteBlockIndex++) {
                votingDenominations[voteBlockIndex] = votingDenominations[voteBlockIndex+1];
            }
            votingDenominations.length--;*/


// User.sol

/*function userExists(address _userAddress) public returns (bool exists) {
        exists = userId[_userAddress] != 0;

        emit UserExists(exists);
        return exists;
    }*/



// Statistics.sol

/*pragma solidity ^0.4.23;

import "./Shareholder.sol";

contract VotingStatistic {

    // sum of the weights or voting power of all users
    uint private totalVotingPower;
    // how much voting power each uses owns
    mapping(address => uint) private votingPower;
    // which proposal is passed
    mapping(uint => bool) private passedProposal;
    // with how much persentage each proposal is passed or not
    mapping(uint => uint) private proposalPercentage;

    function updateVotingPower(address userAddress, uint weight) public {
        votingPower[userAddress] = weight;
    }

    function updatePassedProposal(uint proposalId, bool proposalPassed) public {
        passedProposal[proposalId] = proposalPassed;
    }

    function updateProposalPercentage(uint proposalId, uint passedPercentage) public {
        proposalPercentage[proposalId] = passedPercentage;
    }

    function setTotalVotingPower(uint newTotalVP) public {
        totalVotingPower = newTotalVP;
    }

    function getTotalVotingPower() public view returns (uint totalVP) {
        return totalVotingPower;
    }*/

    /*
    function calculateVotingStatistic(uint proposalId) public {
        VotingStatistic statistic = new VotingStatistic();

        for (uint j = 0; j < users.length; j++) {
            statistic.updateVotingPower(users[j].userAddress(), votingTokens[users[j].userAddress()]);
            uint totalVotPow = statistic.getTotalVotingPower();
            statistic.setTotalVotingPower(totalVotPow + votingTokens[users[j].userAddress()]);
        }
        for (uint i = 0; i < proposals.length; i++) {
            statistic.updatePassedProposal(proposals[i].proposalId, proposals[i].proposalPassed);
            statistic.updateProposalPercentage(proposalId, proposals[i].passedPercent);
        }
    } 
}*/


// qAndA.js

/*

for (var i = 0; i < questNum; i++) {
                var currQuestArr = await getQuestion(i);
                console.log(currQuestArr);
                var mappQuest = mapQuestion(currQuestArr);
                var qaWrapper = $(
                    `<div>
                            <a href="#question-${i+1}" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-danger">
                                <div id="${i + 1}"> Question ${i + 1}: ${mappQuest.content} </div>
                            </a>
                    </div>`
                );

                console.log(qaWrapper.html());
                $('main #quest-answ-list').append(qaWrapper.html());
                var divWrapper = $('<div></div>');
                var ansWrapper = $('<ol class="list-group"></ol>');
                var count = 0;
                for (var j = 0; j < answNum; j++) {
                    console.log(j);
                    var currAnswArr = await getAnswer(j);
                    console.log(currAnswArr);
                    var mappAnsw = mapAnswer(currAnswArr);
                    if (mappAnsw.questionId === i) {
                        ansWrapper.append(`<li class="list-group-item list-group-item-action flex-column align-items-start list-group-item-success">Answer ${count + 1}: ${mappAnsw.content}</li>`);
                        count++;
                    }
                }
                divWrapper.append(ansWrapper);
                console.log(divWrapper.html());
                $(`main div[id="${i + 1}"]`).append(divWrapper.html());
            }

        //console.log(document.body);

        }, 1000);

*/


/*
for (;!allVisited; allVisited = visitedArr.filter(q => q.visited === true).length === questNum.toNumber()) {
                priorityMetric = 0;
                console.log(questNum);
                console.log(visitedArr.filter(q => q.visited === true).length);
                console.log(allVisited);
                console.log(visitedArr);

                for (var i = 0; i < questNum; i++) {

                    var currQuestArr = await getQuestion(i);
                    //console.log(currQuestArr);
                    var mappQuest = mapQuestion(currQuestArr);
                    var questPriority = mappQuest.upvotes - mappQuest.downvotes;
                    console.log(mappQuest.questionId, questPriority);
                    //console.log(mappQuest.questionId + ': ' + questPriority);

                    if (questPriority >= priorityMetric
                        && !(visitedArr.map(q => q.questId).includes(mappQuest.questionId)) ) {
                        //console.log('inner if');
                        priorityMetric = questPriority;
                        visitedArr.push({questId: mappQuest.questionId, visited: true});
                        var qaWrapper = $(
                            `<div>
                                    <a href="#question-${i+1}" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-danger">
                                        <div id="${i + 1}"> Question ${questCount++}: ${mappQuest.content} </div>
                                    </a>
                            </div>`
                        );

                        //console.log(qaWrapper.html());
                        $('main #quest-answ-list').append(qaWrapper.html());
                        var divWrapper = $('<div></div>');
                        var ansWrapper = $('<ol class="list-group"></ol>');
                        var count = 0;
                        for (var j = 0; j < answNum; j++) {
                            //console.log(j);
                            var currAnswArr = await getAnswer(j);
                            //console.log(currAnswArr);
                            var mappAnsw = mapAnswer(currAnswArr);
                            if (mappAnsw.questionId === i) {
                                ansWrapper.append(`<li class="list-group-item list-group-item-action flex-column align-items-start list-group-item-success">Answer ${count + 1}: ${mappAnsw.content}</li>`);
                                count++;
                            }
                        }
                        divWrapper.append(ansWrapper);
                        //console.log(divWrapper.html());
                        $(`main div[id="${i + 1}"]`).append(divWrapper.html());
                    }


                }
            }
            visitedArr = [];
            console.log('escaped for loop');
*/

// statistics.js

/*import {getIsFinished} from '../../provider/AgmOwnerProvider';
import {getNumOfVotingOptions, getVotingOption, getWeightOfShareholder, getNumOfVotingShareholders, getNumOfProposals, getTotalVoteCount, appendVotingOptionToProposal, getProposal} from '../../provider/ProposalProvider';
import {finishAGM, createProposal, addUser, removeUser, getUser, getNumOfUsers, getOwnerAddress, transferOwnership, getOwners, hasPermission, executeProposal} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress, createAlert, showView} from './authentication';
import {mapProposal} from './voting';

$(function() {

    
});*/

// voting.js

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

// ownerprovider.js

// export function hasPermission(from) {
//     return AgmOwnerContract.deployed().then(function(instance) {
//         AgmOwner = instance;
//         return AgmOwner.hasPermission.call({from: from});
//     }).then(function(result) {
//         console.log(result);
//         //alert('hasPermission call was successful: ' + result);
//         return result;
//     }).catch(function(error) {
//         console.log(error);
//     });   
// }


// ipfsProvider.js

/*"/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
                  "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
                  "/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
                  "/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
                  "/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64"*/
                //'/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
                    //'/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',


/*

// import * as AgmOwnerArtifact from './../artifacts/contracts/AgmOwner';

//console.log(AgmOwnerArtifact);

const IPFS = require('ipfs');
const series = require('async/series');


const node = new IPFS();

series([
    (cb) => node.on('ready', cb),
    (cb) => node.version((err, version) => {
      if (err) { return cb(err) }
      console.log('Version:', version.version)
      cb()
    }),
    (cb) => node.files.add({
      path: 'hello.txt',
      content: Buffer.from('Hello World 101')
    }, (err, filesAdded) => {
      if (err) { return cb(err) }
  
      console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
      fileMultihash = filesAdded[0].hash
      cb()
    }),
    (cb) => node.files.cat(fileMultihash, (err, data) => {
      if (err) { return cb(err) }
  
      console.log('\nFile content:')
      process.stdout.write(data)
    })
])
 */

// ProposalProvider.js

/*export function appendVotingOption(opt, from) {
    return FactoryContract.deployed().then(function(deplFac) {
        Factory = deplFac;
        //Factory.getNumOfProposals.estimateGas().then(function(result){console.log('estimateGas: ' + result)});
        return Factory.appendVotingOption.sendTransaction(opt, {gas: gas, from: from});
    }).then(function(result) {
        //alert('getNumOfProposals call was successful: ' + result);
    }).catch(function(error) {
        console.log('Error during getNumOfProposals call: ' + error.message);
    }); 
}*/

// ShareholderProvider

/*export function getVotingDenominations() {
  return ShareholderContract.deployed().then(function (deplShareh) {
    Shareholder = deplShareh;
    return Shareholder.getVotingDenominations.call();
  }).then(function (result) {
    //alert('getVotingDenominations TX was successful: ' + result);
    return result;
  }).catch(function (error) {
    console.log('error during getVotingDenominations TX: ' + error.message);
  });
}*/
