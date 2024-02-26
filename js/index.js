// sets the current date
function setCurrentDate() {
  const date = new Date();
  const dateArray = [date.getFullYear(), date.getDate(), date.getMonth()]
  const [year, day, month] = dateArray

  document.getElementById("dateDisplay").innerHTML = [year,day,month].join("/");
  document.getElementById("date").valueAsDate = date;
}

// Add event listener for type select
function handleTypeSelect() {
  document.getElementById("type").addEventListener("change", function (event) {
    const type = event.target.value;
    const categorySelect = document.getElementById("category");

    // Clear the category select
    categorySelect.innerHTML = "";

    // Add the appropriate options based on the type
    if (type === "income") {
      categorySelect.innerHTML = `
      <option value="allowance">Allowance</option>
      <option value="job">Job</option>
    `;
    } else if (type === "expense") {
      categorySelect.innerHTML = `
      <option value="food">Food</option>
      <option value="transportation">Transportation</option>
      <option value="clothing">Clothing</option>
      <option value="education">Education</option>
      <option value="electronics">Electronics</option>
    `;
    }
  });

  // Trigger the change event to populate the category options
  document.getElementById("type").dispatchEvent(new Event("change"));
}

// Fetch all budget items and calculate total balance
function fetchAndCalculateBalance() {
  fetch("http://localhost:3010/budget_items")
    .then((response) => response.json())
    .then((data) => {
      let totalIncome = 0;
      let totalExpense = 0;

      data.forEach((item) => {
        if (item.type === "income") {
          totalIncome += item.amount;
        } else if (item.type === "expense") {
          totalExpense += item.amount;
        }
      });

      const totalBalance = totalIncome - totalExpense;
      document.getElementById("totalBalance").innerText =
        `Total Balance: ${totalBalance}`;
    });
}


function fetchAndDisplayRecords() {
  // Fetch the records
  fetch("http://localhost:3010/records")
    .then((response) => response.json())
    .then((data) => {
      // Reverse the data array
      data = data.reverse();

      // Clear the div
      const recordsDiv = document.getElementById("records");
      recordsDiv.innerHTML = "";

      // Add a div for each record
      data.forEach((record) => {
        let recordDiv = document.createElement("div"); // Create a new div
        recordDiv.innerHTML = `
     <p>Type: ${record.type}</p>
     <p>Category: ${record.category}</p>
     <p>Note: ${record.note}</p>
     <p>Amount: ${record.amount}</p>
     <p>Date: ${record.date}</p>
   `;
        recordsDiv.appendChild(recordDiv); // Append the div to the recordsDiv
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Handle the form submission
function handleFormSubmission() {
  document
    .getElementById("budgetItemForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      fetch("http://localhost:3010/budget_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // Fetch all budget items and calculate total balance
          fetchAndCalculateBalance();
          // Fetch and display the records again
          fetchAndDisplayRecords();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
}

// Call these functions in the `window.onload` event
window.onload = (event) => {
  setCurrentDate();
  handleTypeSelect();
  fetchAndDisplayRecords();
  fetchAndCalculateBalance();
  handleFormSubmission();
};
