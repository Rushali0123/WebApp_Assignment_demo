const projectNameButton = document.querySelector("#projectNameSubmit");
const projectNameInput = document.querySelector("#projectNameInput");

projectNameButton.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.setItem(
    "projectName",
    JSON.stringify(projectNameInput.value ? projectNameInput.value : "")
  );
  window.location.href = "http://127.0.0.1:5500/pages/projectInfo.html"
});
