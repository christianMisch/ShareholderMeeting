// import web3Provider from '../../provider/web3Provider';

$(document).ready(function() {

    const ownerAddress = '0x0'/*web3Provider.eth.accounts[0]*/;
    const masterPW = 'master';
    var authorizedUsers = {
        '0x72cccDBCFb464a240c025969bb9Bb81Da0392a90': {password: 'pw1', role: 'Shareholder'},
        '0x5E3407E44756371B4D3De80Eb4378b715c444619': {password: 'pw2', role: 'Director'}
    };

    $('#login-button').click(function(e) {
        
        e.preventDefault();
        const inputAdr = $('#wallet-address').val();
        const inputPW = $('#password').val();
        //console.log(inputAdr, inputPW);

        if (inputAdr === ownerAddress && inputPW === masterPW) {
            $('#wrapper').append('<div role="alert">You have successfully logged in as AgmOwner!</div>')
                .addClass('alert alert-success');
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: AgmOwner');
            $('a[href="home"]').trigger('click');

        } else if (Object.keys(authorizedUsers).includes(inputAdr) 
            && authorizedUsers[inputAdr].password === inputPW 
            && authorizedUsers[inputAdr].role === 'Shareholder') {
            
                $('#wrapper').append('<div role="alert">You have successfully logged in as Shareholder!</div>')
                    .addClass('alert alert-success');
                $('#userAddress').html('User: ' + inputAdr);
                $('#userRole').html('Role: Shareholder');
                $('a[href="home"]').trigger('click');

        } else if (Object.keys(authorizedUsers).includes(inputAdr)
             && authorizedUsers.inputAdr.password === inputPW
             && authorizedUsers.inputAdr.role === 'Director') {

            $('#wrapper').append('<div role="alert">You have successfully logged in as Shareholder!</div>')
                .addClass('alert alert-success');
            $('#userAddress').html('User: ' + inputAdr);
            $('#userRole').html('Role: Director');
            $('a[href="home"]').trigger('click');
        
        } else {
            $('#wrapper').append('<div role="alert">Login failed!</div>')
                .addClass('alert alert-danger');
        }
        console.log($('#wrapper div').length);
        setTimeout(function() {
            $("#wrapper").empty('div');
        }, 3000);
    });

});