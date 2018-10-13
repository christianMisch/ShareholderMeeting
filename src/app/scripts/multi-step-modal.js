/**
 * @summary contains the logic for the registration model to switch between the two steps during the reg. process
 */

$('main').on('click', '#auth-modal', function() {
    $('main h4[data-step="2"]').css('display', 'none');
    $('main div[class="modal-body step step-2"]').css('display', 'none');
    // append the content of the 2nd registration step to the modal
    $('main').on('click', 'button[data-step="1"]', function() { 
        $('main h4[data-step="1"]').css('display', 'none');
        $('main h4[data-step="2"]').css('display', 'block');
        $('main #step-2').css('display', 'block');
        $('div[class="modal-footer"] button').eq(1).remove();
        $('div[class="modal-footer"]').append($('<button type="button" class="btn btn-primary" data-dismiss="modal" id="finish-button" disabled=true>Finish</button>'));
        $('button[data-step="1"]').css('display', 'none'); 
    });
});