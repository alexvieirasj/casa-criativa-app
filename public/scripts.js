
const ideas = document.querySelectorAll('.idea');

//Mostra ou oculta o botão delete
for(let idea of ideas) {

    idea.addEventListener('mouseover', function(){

        // idea.classList.add('idea_border');
        idea.querySelector('div:last-child').classList.remove('hide');
    });

    idea.addEventListener('mouseout', function(){
        // idea.classList.remove('idea_border');
        idea.querySelector('div:last-child').classList.add('hide');
    });
}



function showOff(){
    document
    .querySelector("#modal .sugestion")
    .classList
    .toggle("hideFields");
}

function onOff2(id){
    
    document.querySelector('input[id=id]').value = id; 

    document
        .querySelector("#modal2")
        .classList
        .toggle("hide");
}        

function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide");

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll");

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll");
}

function checkFields(event){

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",
    ];

    
    const isEmpty = valuesToCheck.find(function(value) {
        const checkIfIsString = typeof event.target[value].value === "string";
        const checkIfIsEmpty = !event.target[value].value.trim();

        if(checkIfIsString && checkIfIsEmpty){
            return true;
        }
    });

    if(isEmpty){
        event.preventDefault();
        alert("Por favor, preencha todos os campos");
    }
    
}