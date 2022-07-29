const totalExperts = document.querySelector("#totalExperts");
const addExpertBtn = document.querySelector("#addExpert");
const decisionMatrix = document.querySelector("#decisionMatrix");
const currentExpert = document.querySelector("#currentExpert");

let defaultTotalExperts = 0;
let matrix = [];
let criteriaListValue = [];
totalExperts.innerHTML = defaultTotalExperts;
currentExpert.innerHTML = defaultTotalExperts + 1;

let createDecisionMatrix = () => {
  const criteriaList = localStorage.getItem("criteriaList");
  if (criteriaList) {
    criteriaListValue = JSON.parse(localStorage.getItem("criteriaList"));

    let innerHTMLVal = `
    <div class="row mt-3">
    <div class="col-6">
    <table class="table table-hover" style="border: 2px solid #ccc">
    <thead>
    <tr>
    <th scope="col">#</th>
    ${createTableHeader()}
    </tr>
    </thead>
    <tbody>
    ${createTableRows()}
    </tbody>
    </table>
    </div>
    </div>
    `;
    decisionMatrix.innerHTML = innerHTMLVal;
  }
};

let createTableRows = () => {
  let result = ``;
  let i = 0;
  while (i < criteriaListValue.length) {
    result += `
          <tr>
              <th scope="row">${criteriaListValue[i]}</th>
              ${addTableData(i)}
          </tr>
          `;
    i++;
  }
  return result;
};

const addTableData = (index) => {
  let result = ``;
  let i = 0;
  while (i < criteriaListValue.length) {
    if (i === index) {
      result += `
    <td>
      <input class="form-control" type="number" value="0" name="criterion${i}_${i}" id="${currentExpert.innerHTML}-${index}-${criteriaListValue[i]}-${i}" disabled>
    </td>`;
    } else {
      result += `
    <td>
      <input class="form-control" type="number" name="criterion${i}_${i}" id="${currentExpert.innerHTML}-${index}-${criteriaListValue[i]}-${i}" min="0" max="4">
    </td>`;
    }
    matrix.push(`${currentExpert.innerHTML}-${index}-${criteriaListValue[i]}-${i}`);
    i++;
  }
  return result;
};

const createTableHeader = () => {
  let result = ``;
  let i = 0;
  while (i < criteriaListValue.length) {
    result += `<th scope="row">${criteriaListValue[i]}</th>`;
    i++;
  }
  return result;
};

(() => {
  createDecisionMatrix();
})();

addExpertBtn.addEventListener("click", (event) => {
  saveDataMatrix();
  matrix = [];
  defaultTotalExperts += 1;
  totalExperts.innerHTML = defaultTotalExperts;
  currentExpert.innerHTML = defaultTotalExperts + 1;
  createDecisionMatrix();
});

const saveDataMatrix = () => {
  console.log(matrix);
  const userData = []
  for(let i = 0; i < criteriaListValue.length; i++) {
    for(let j = 0; j < criteriaListValue.length; j++) {
      userData.push(document.getElementById(`${currentExpert.innerHTML}-${i}-${criteriaListValue[j]}-${j}`).value);
    }
  }
  localStorage.setItem(`matrix-${currentExpert.innerHTML}`, JSON.stringify(userData));
}
const submitDataForm = () => {
  saveDataMatrix();
  localStorage.setItem('numberOfMatrices',currentExpert.innerHTML);
  window.location.href = "./output.html";
};
