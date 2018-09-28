$('main').on('click', '#auth-modal', function() {
    $('main h4[data-step="2"]').css('display', 'none');
    $('main div[class="modal-body step step-2"]').css('display', 'none');

    $('main').on('click', 'button[data-step="1"]', function() {
        
        $('main h4[data-step="1"]').css('display', 'none');

        $('main h4[data-step="2"]').css('display', 'block');
        $('main #step-2').css('display', 'block');
        $('div[class="modal-footer"]').eq(1).remove();
        $('div[class="modal-footer"]').append($('<button type="button" class="btn btn-primary" data-dismiss="modal" id="finish-button" disabled=true>Finish</button>'));
        $('button[data-step="1"]').css('display', 'none'); 
    });
});