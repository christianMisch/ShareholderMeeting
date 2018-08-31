import {createProposal, addUser, removeUser, getUser, getNumOfUsers, getOwnerAddress, transferOwnership, getOwners, hasPermission} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress, createAlert} from './authentication';
import {upload} from '../../provider/IPFSUploadProvider';
//import {web3} from './index';

//const owner = web3Provider.eth.accounts[0];
//console.log('owner address: ' + owner);

$(document).ready(function() {

    $('a[href="#setup"]').click(function() {

        $('main').on('click', 'input[id="proposal-creator-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            console.log('activeUserAddress: ' + activeUserAddress);
            //console.log('ownerAddress: ' + ownerAddress);
            //console.log('activeUserAdr: ' + activeUserAddress);
            //console.log('owner: ' + owner.toUpperCase());
            /*console.log(await getOwners());
            console.log('hasPermission: ' + (await getOwners()).includes(activeUserAddress.toLowerCase()))*/
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            
            const propName = $('#proposal-name').val();
            const propDescription = $('#proposal-description').val();
            var propHash = await upload(propDescription);
            const propOptions = $('#proposal-options').val();
            //console.log(activeUserAddress, propName, propDescription, propOptions);
            createProposal(propName, propHash, propOptions, activeUserAddress);
        });

        $('main').on('click', 'input[id="add-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newUserAddress = $('#new-user-address').val().toLowerCase();
            const role = parseInt($('#director-flag').val());
            //console.log('role: ' + typeof(role));
            const numOfShares = $('#num-of-shares').val();
            addUser(newUserAddress, role, numOfShares, activeUserAddress);
            getNumOfUsers();
            const mapRole = role === 0 ? 'AgmOwner': (role === 1 ? 'Director': 'Shareholder');
            //console.log('mapRole: ' + mapRole);  
            //setAuthorizedUsers(newUserAddress, {role: mapRole, loggedIn: false, shares: parseInt(numOfShares)});
            //console.log(getAuthorizedUsers());

        });

        $('main').on('click', 'input[id="remove-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress().toLowerCase();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const adrOfRemovedUser = $('#remove-user-address').val().toLowerCase();
            removeUser(adrOfRemovedUser, activeUserAddress);
            getNumOfUsers();
        });

        $('main').on('click', 'input[id="transfer-ownership-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            if (!(await getOwners()).includes(activeUserAddress)) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newOwnerAddress = $('#ownership-address').val().toLowerCase();
            console.log(newOwnerAddress);
            await transferOwnership(newOwnerAddress, activeUserAddress);
        
        });
    });

});