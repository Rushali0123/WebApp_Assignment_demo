const cardHeaderElement = document.querySelector(".card-header");
const numberOfCriteria = document.querySelector("#numberOfCriteras");
const numberOfCriteriaBtn = document.querySelector("#numberOfCriteraBtn");
const criteriaTable = document.querySelector(".criteria-table");
const projectInfoSubmit = document.querySelector("#projectInfoSubmit");
const criteriaForm = document.querySelector(".criteriaForm");

projectInfoSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "./dataEntry.html";

});

numberOfCriteriaBtn.addEventListener("click", (event) => {
  const val = numberOfCriteria.value;
  if (val > 1) {
    createCriteriaTable(val);
  }
});

let createCriteriaTable = (numOfCriteria = 4) => {
  let innerHTMLVal = `
  <div class="row mt-3">
    <div class="col-6">
        <table class="table table-hover" style="border: 2px solid #ccc">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                </tr>
            </thead>
        <tbody>
            ${createTableRows(numOfCriteria)}
        </tbody>
    </table>
    </div>
  </div>
    `;
  criteriaTable.innerHTML = innerHTMLVal;
};

let createTableRows = (numOfCriteria) => {
  let result = ``;
  let i = 1;
  while (i <= numOfCriteria) {
    result += `
        <tr>
            <th scope="row">${i}</th>
            <td>
                <input class="form-control" type="text" value="criterion${i}" name="criterion${i}">
            </td>
        </tr>
        `;
    i++;
  }
  return result;
};

(() => {
  const projectName = localStorage.getItem("projectName");
  if (projectName) {
    const projectNameVal = JSON.parse(localStorage.getItem("projectName"));
    if (projectNameVal) {
      cardHeaderElement.innerHTML = `Project Name : ${projectNameVal}`;
    }
  }
  createCriteriaTable();
})();

const submitCriteriaForm = (formVal) => {
  if(!formVal.elements.length){
    return null;
  }
  let criteriaInputValues = [];

  for(let i=0; i < formVal.elements.length; i++){
    if(formVal.elements[i].name.includes('criterion')){
      criteriaInputValues.push(formVal.elements[i].value);
    }
  }
  localStorage.setItem('criteriaList', JSON.stringify(criteriaInputValues));
};
