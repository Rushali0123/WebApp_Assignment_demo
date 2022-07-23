const projectNameButton = document.querySelector('#projectNameSubmit');
const projectNameInput = document.querySelector('#projectNameInput');

projectNameButton.addEventListener('click', (event)=>{
    event.preventDefault();
    console.log("button clicked", projectNameInput.value)
})