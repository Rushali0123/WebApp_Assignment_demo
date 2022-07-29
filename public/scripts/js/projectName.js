const projectNameButton = document.querySelector("#projectNameSubmit");
const projectNameInput = document.querySelector("#projectNameInput");

projectNameButton.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
  localStorage.setItem(
    "projectName",
    JSON.stringify(projectNameInput.value ? projectNameInput.value : "")
  );
  window.location.href = "./pages/projectInfo.html"
});
