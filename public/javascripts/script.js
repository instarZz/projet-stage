$(document).ready(async function(){

    const $form = $('#form'),
    $containerForm = $('#containerForm'),
    $iconsEdit = $('.js-edit'),
    $iconClose = $('.icon-close'),
    $body = $('body'),
    $submitBtn = $('#submit-btn'),
    $formInput = $('.form-input'),
    $labelElt = $('.label-elt'),
    $containerInput = $('.container-input');
    
    // $formInput.on('focus', (event) => {
    //     const $input = $(event.currentTarget);
        
    //     $input.next().removeClass('big-label').addClass('small-label');
    // });
    // $formInput.on('keyup', function(event){
    //     const target = event.currentTarget;
    //     handleLabelChange(target);
    // }); 



    $containerForm.css({"display":"none"});
    
    $iconsEdit.on('click', async function(event){       
            
            $containerForm.css({"display":"flex"});
            $body.css({"overflow":"hidden"});
            
            $submitBtn.html('Modifier');

            const teamId = $(event.currentTarget).attr("data-team-id");

            await populateForm(teamId, $formInput);
            // initLabel($formInput);

        });

    // function getInputVal($input) {
    //     val = $input.val();
    //     return val;
    // }

    // function editLabel(val, $label, $input) {
    //     if(val==='') {
    //         $label.addClass('big-label');
    //         $label.removeClass('small-label');            
    //     } else {
    //         $label.removeClass('big-label');
    //         $label.addClass('small-label');
    //     }
    // }

    // function handleLabelChange(input){
    //     const $input = $(input);
    //     const val = getInputVal($input);
    //     const $label = $input.next();
    //     editLabel(val, $label, $input);

    // }

    // function initLabel($formInput) {
    //     $formInput.each((i, input)=>{
    //         handleLabelChange(input);
    //     });  
    // };

    async function populateForm(teamId) {
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
    };

    $iconClose.on('click', function(){
        $containerForm.css({"display":"none"});
        $body.css({"overflow":"auto"});
    });
    
    $containerForm.on('click',(event) => {
        if(event.target === $containerForm[0]) {
            $containerForm.css({"display":"none"});
        }
    });
    
    
    
    
    
    
    
});