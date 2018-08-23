import {createProposal, addUser, removeUser, getUser, getNumOfUsers, getOwnerAddress, transferOwnership, getOwners} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress, authorizedUsers, createAlert} from './authentication';
import web3Provider from '../../provider/web3Provider';

//const owner = web3Provider.eth.accounts[0];
//console.log('owner address: ' + owner);

$(document).ready(function() {

    $('a[href="#setup"]').click(function() {

        $('main').on('click', 'input[id="proposal-creator-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            const ownerAddress = await getOwnerAddress();
            console.log('ownerAddress: ' + ownerAddress);
            console.log('activeUserAdr: ' + activeUserAddress);
            //console.log('owner: ' + owner.toUpperCase());
            if (activeUserAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            
            const propName = $('#proposal-name').val();
            const propDescription = $('#proposal-description').val();
            const propOptions = $('#proposal-options').val();
            console.log(activeUserAddress, propName, propDescription, propOptions);
            createProposal(propName, propDescription, propOptions, activeUserAddress);
        });

        $('main').on('click', 'input[id="add-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            const ownerAddress = await getOwnerAddress();
            if (activeUserAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newUserAddress = $('#new-user-address').val();
            const isDirector = $('#director-flag').val();
            const numOfShares = $('#num-of-shares').val();
            addUser(newUserAddress, isDirector, numOfShares, activeUserAddress);
            getNumOfUsers();
        });

        $('main').on('click', 'input[id="remove-user-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            const ownerAddress = await getOwnerAddress();
            if (activeUserAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const adrOfRemovedUser = $('#remove-user-address').val();
            removeUser(adrOfRemovedUser, activeUserAddress);
            getNumOfUsers();
        });

        $('main').on('click', 'input[id="transfer-ownership-button"]', async function() {
            const activeUserAddress = getActiveUserAddress();
            const ownerAddress = await getOwnerAddress();
            if (activeUserAddress.toLowerCase() !== ownerAddress.toLowerCase()) {
                createAlert('You have currently no permission to setup the AGM', 'danger');
                return;
            }
            const newOwnerAddress = $('#ownership-address').val();
            console.log(newOwnerAddress);
            await transferOwnership(newOwnerAddress, activeUserAddress);
        
        });
    });

});