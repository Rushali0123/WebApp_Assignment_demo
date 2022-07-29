const directRelationMatrix = document.querySelector("#directRelationMatrix");
const normalizedDirectRelationMatrix = document.querySelector(
  "#normalizedDirectRelationMatrix"
);
const totalRelationMatrix = document.querySelector("#totalRelationMatrix");

let criteriaListValue = [];
let matrices = [];
let directMatrix = [];
let matricesCount = 0;
let normalizedMatrix = [];
let totalMatrix = [];

const createOutput = () => {
  const criteriaList = localStorage.getItem("criteriaList");
  if (criteriaList) {
    criteriaListValue = JSON.parse(localStorage.getItem("criteriaList"));
    matricesCount = Number(localStorage.getItem('numberOfMatrices'));

    for (let i = 0; i < matricesCount; i++) {
      matrices.push(JSON.parse(localStorage.getItem(`matrix-${i+1}`)));  //"matrix " + (i+1)
    }

    for (let i = 0; i < matrices[0].length; i++) {
        directMatrix.push(0);
        for (let j = 0; j < matricesCount; j++) {
            directMatrix[i] += Number(matrices[j][i]);
        }
        directMatrix[i] = directMatrix[i]/matricesCount;
    }

    let maxRowSum = 0;
    for (let i = 0; i < criteriaListValue.length; i++) {
        let rowSum = 0;
        for (let j = 0; j < criteriaListValue.length; j++) {
            rowSum += directMatrix[i * criteriaListValue.length + j];
        }
        if(rowSum > maxRowSum) {
            maxRowSum = rowSum;
        }
    }

    for (let i = 0; i < directMatrix.length; i++) {
        normalizedMatrix.push((directMatrix[i]/maxRowSum).toFixed(3));
    }



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
    ${createTableRows("direct")}
    </tbody>
    </table>
    </div>
    </div>
    `;
    directRelationMatrix.innerHTML = innerHTMLVal;

    innerHTMLVal = `
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
    ${createTableRows("normalized")}
    </tbody>
    </table>
    </div>
    </div>
    `;
    normalizedDirectRelationMatrix.innerHTML = innerHTMLVal;

    innerHTMLVal = `
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
    ${createTableRows("total")}
    </tbody>
    </table>
    </div>
    </div>
    `;
    totalRelationMatrix.innerHTML = innerHTMLVal;

  }

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

const createTableRows = (tableName) => {
  let result = ``;
  let i = 0;
  while (i < criteriaListValue.length) {
    result += `
            <tr>
                <th scope="row">${criteriaListValue[i]}</th>
                ${addTableData(tableName, i)}
            </tr>
            `;
    i++;
  }
  return result;
};

const addTableData = (tableName, index) => {
  let result = ``;
  let i = 0;
  while (i < criteriaListValue.length) {
    if (tableName == "direct") {
      result += `
      <td>${directMatrix[index * criteriaListValue.length + i]}</td>`;
    } else if (tableName == "normalized") {
      result += `
      <td>${normalizedMatrix[index * criteriaListValue.length + i]}</td>`;
    } else if (tableName == "total") {
      result += `
      <td>${totalMatrix[index * criteriaListValue.length + i]}</td>`;
    }
    i++;
  }
  return result;
};

(() => {
  createOutput();
})();
