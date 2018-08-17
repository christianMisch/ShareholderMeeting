import {createProposal, addUser, removeUser, getUser, getNumOfUsers} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress, authorizedUsers} from './authentication';
import web3Provider from '../../provider/web3Provider';

const owner = web3Provider.eth.accounts[0];

$(document).ready(function() {

    $('a[href="#setup"]').click(function() {
        $('main').on('click', 'input[id="proposal-creator-button"]', function() {
            const activeUserAddress = getActiveUserAddress();
            const propName = $('#proposal-name').val();
            const propDescription = $('#proposal-description').val();
            const propOptions = $('#proposal-options').val();
            console.log(activeUserAddress, propName, propDescription, propOptions);
            createProposal(propName, propDescription, propOptions, owner);
        });

        $('main').on('click', 'input[id="add-user-button"]', function() {
            const newUserAddress = $('#new-user-address').val();
            const isDirector = $('#director-flag').val();
            const numOfShares = $('#num-of-shares').val();
            addUser(newUserAddress, isDirector, numOfShares, owner);
            getNumOfUsers();
        });

        $('main').on('click', 'input[id="remove-user-button"]', function() {
            const adrOfRemovedUser = $('#remove-user-address').val();
            //removeUser(adrOfRemovedUser, owner);
        })
    });

});
