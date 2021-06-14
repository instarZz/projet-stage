$(document).ready(async function(){

    const $form = $('#form');
    const $containerForm = $('#containerForm');
    const $iconsEdit = $('.js-edit');
    const $iconClose = $('.icon-close');
    const $body = $('body');

    $containerForm.css({"display":"none"});

    $iconsEdit.on('click', function(event){
        const teamId = $(event.currentTarget).attr("data-team-id");
        console.log(teamId);

        const response = await fetch('http://localhost:3000/getTeams', {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);

        $containerForm.css({"display":"flex"});
        $body.css({"overflow":"hidden"});

    });

    $iconClose.on('click', function(){
        $containerForm.css({"display":"none"});
        $body.css({"overflow":"auto"});
    });




        

});