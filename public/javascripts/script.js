$(document).ready(async function(){
    
    const $form = $('#form'),
    $containerForm = $('#containerForm'),
    $iconClose = $('.icon-close'),
    $body = $('body'),
    $submitBtn = $('#submit-btn'),
    $formInput = $('.form-input');
    let $iconsEdit = $('.js-edit'),
    $iconsDelete = $('.icons-delete'),
    $iconAddTeam = $('#add-team');
    
    $containerForm.css({"display":"none"});
    
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
        $form.attr("data-team-id", teamId);
    };

    async function fetchAndUpdateDOM(route, formData) {
        const response = await fetch(`http://localhost:3000/${route}`, {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: "post",
        });
        const htmlTable = await response.text();
        $('.container-table').replaceWith(htmlTable);
        $iconAddTeam = $('#add-team');
        $iconsEdit = $('.js-edit');
        $iconsDelete = $('.icons-delete');
        attachTableListeners();
    } 

    // EVENT LISTENER

    function attachTableListeners() {
        $iconAddTeam.on('click', function(){
            $containerForm.css({"display":"flex"});
            $submitBtn.html('Enregistrer');
            // Empecher le scroll du popup
            $body.css({"overflow":"hidden"});
            // Nettoyer les champs des input
            $formInput.each((i, input)=>{
                const $input = $(input);
                $input.val('');
            });
        });

        $iconsEdit.on('click', async function(event){       
            $containerForm.css({"display":"flex"});
            $body.css({"overflow":"hidden"});           
            $submitBtn.html('Modifier');  
            const teamId = $(event.currentTarget).attr("data-team-id");  
            await populateForm(teamId, $formInput);    
        });

        $iconsDelete.on('click', async function(event) {
            const $iconDelete = $(event.currentTarget);
            const dataId = $iconDelete.attr('data-team-id');
            await fetchAndUpdateDOM('deleteTeam', {id: dataId});
        });
    };
    attachTableListeners();

    $iconClose.on('click', function(){
        $containerForm.css({"display":"none"});
        $body.css({"overflow":"auto"});
    });
    
    $containerForm.on('click',(event) => {
        if(event.target === $containerForm[0]) {
            $containerForm.css({"display":"none"});
        }
    });
    
    $form.on('submit', async e => {
        e.preventDefault();
        
        let formData = {};
        $formInput.each((i, elt)=>{
            const $elt = $(elt);
            const dataType = $elt.attr("data-type");
            const val = $elt.val();
            formData[dataType] = val;
        });
        
        for(const[key, val] of Object.entries(formData)){
            console.log(`key: ${key} val: ${val}`);
        };
        
        const id = $form.attr("data-team-id");
        formData['id'] = id;

        if(id === ''){
            await fetchAndUpdateDOM('addTeam', formData);
        } else {            
            await fetchAndUpdateDOM('editTeam', formData);  
        }
    }); 
});
    