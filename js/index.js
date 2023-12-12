// sets the current date
window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("incomeDate").valueAsDate = new Date();
});
document
  .getElementById("incomeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);
    fetch("http://localhost:3010/income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update UI here
      });
  });

document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    fetch("http://localhost:3010/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update UI here
      });
  });
