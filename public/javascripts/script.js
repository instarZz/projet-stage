$(document).ready(async function(){

    const $form = $('#form');
    const $containerForm = $('#containerForm');
    const $iconsEdit = $('.js-edit');
    const $iconClose = $('.icon-close');
    const $body = $('body');
    const $submitBtn = $('#submit-btn');
    const $formInput = $('.form-input');

    $containerForm.css({"display":"none"});

    $iconsEdit.on('click', async function(event){


        // const response = await fetch('http://localhost:3000/getTeams', {
        //     method: 'GET',
        // });
        // console.log(data);
        
        // const id = data_team_id
        
        $containerForm.css({"display":"flex"});
        $body.css({"overflow":"hidden"});
        
        $submitBtn.html('Modifier');
        
        const teamId = $(event.currentTarget).attr("data-team-id");
        // console.log(teamId);
        const response = await fetch(`http://localhost:3000/getTeam?id=${teamId}`, {
            method: 'GET',
        });
        const data = await response.json();
        $formInput.each((i, elt)=>{
            const $elt = $(elt);
            const dataType = $elt.attr("data-type");
            const val = data[dataType];
            $elt.val(val);
        });
    });

    $iconClose.on('click', function(){
        $containerForm.css({"display":"none"});
        $body.css({"overflow":"auto"});
    });

    




        

});