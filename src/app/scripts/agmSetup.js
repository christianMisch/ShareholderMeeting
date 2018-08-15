import {createProposal, addUser, removeUser} from '../../provider/AgmOwnerProvider';
import {getActiveUserAddress} from './authentication';
import web3Provider from '../../provider/web3Provider';

$(document).ready(function() {
    // check how to access the buttons which are defined in the templates --> printout the main tag with inserted templates
    $('footer').append('<input value="test" type="button" id="test"></input');
    $('#test').click(function() {
        const owner = web3Provider.eth.accounts[0];
        console.log('ownerAddress: ' + owner);
        createProposal('name', 'description', 'options', owner);
    });

    $('#main proposal-creator-button').click(function() {
        alert('Proposal button');
        const activeUserAddress = getActiveUserAddress();
        const propName = $('#proposal-name').val();
        const propDescription = $('#proposal-description').val();
        const propOptions = $('#proposal-options').val();
        createProposal(propName, propDescription, propOptions, activeUserAddress);
    });


    $('#add-user-button').click(function() {
        const newUserAddress = $('#new-user-address').val();
        const isDirector = $('#director-flag').val();
        const numOfShares = $('#num-of-shares').val();
        addUser(newUserAddress, isDirector, numOfShares);
    })

    $('#remove-user-button').click(function() {
        const adrOfRemovedUser = $('#remove-user-address').val();
        removeUser(adrOfRemovedUser);
    })

});