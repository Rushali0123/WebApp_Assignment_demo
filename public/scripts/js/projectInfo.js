const cardHeaderElement = document.querySelector(".card-header");
const numberOfCriteria = document.querySelector("#numberOfCriteras");
const numberOfCriteriaBtn = document.querySelector("#numberOfCriteraBtn");
const criteriaTable = document.querySelector(".criteria-table");
const projectInfoSubmit = document.querySelector('#projectInfoSubmit');

projectInfoSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    // TODO : Store table data in localstorage
    window.location.href = "http://127.0.0.1:5500/pages/dataEntry.html"
  });

numberOfCriteriaBtn.addEventListener("click", (event) => {
  const val = numberOfCriteria.value;
  if (val > 1 && val < 6) {
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
                <input class="form-control" type="text" value="criterion${i}">
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
    // console.log(projectNameVal);
    if (projectNameVal) {
      cardHeaderElement.innerHTML = `Project Name : ${projectNameVal}`;
    }
  }
  createCriteriaTable();
})();
