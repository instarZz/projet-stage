$(document).ready(function(){

    const $form = $('#form');
    const $containerForm = $('#containerForm');
    const $iconsEdit = $('.js-edit');
    const $iconClose = $('.icon-close');
    const $body = $('body');

    $containerForm.css({"display":"none"});

    $iconsEdit.on('click', function(){
        $containerForm.css({"display":"flex"});
        $body.css({"overflow":"hidden"});
    });

    $iconClose.on('click', function(){
        $containerForm.css({"display":"none"});
        $body.css({"overflow":"auto"});
    });

});