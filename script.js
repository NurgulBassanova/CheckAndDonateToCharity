const charities = [
  { id: 1, name: "Hope Foundation" },
  { id: 2, name: "WaterAid Project" },
];

const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

// Populate charity list
if (document.getElementById("charity-list")) {
  const listDiv = document.getElementById("charity-list");
  charities.forEach(c => {
    listDiv.innerHTML += `<div><strong>${c.name}</strong> <a href="donate.html">Donate</a></div>`;
  });
}

// Populate dropdown
if (document.getElementById("charitySelect")) {
  const select = document.getElementById("charitySelect");
  charities.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.name;
    opt.textContent = c.name;
    select.appendChild(opt);
  });
}

// Handle form
if (document.getElementById("donation-form")) {
  document.getElementById("donation-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("donorName").value;
    const amount = document.getElementById("amount").value;
    const charity = document.getElementById("charitySelect").value;

    transactions.push({
      donor: name,
      charity,
      amount,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    alert("Thank you for your donation!");
    window.location.href = "ledger.html";
  });
}

// Render ledger
if (document.getElementById("ledger-body")) {
  const tbody = document.getElementById("ledger-body");
  transactions.forEach(tx => {
    tbody.innerHTML += `<tr>
      <td>${tx.donor}</td>
      <td>${tx.charity}</td>
      <td>${tx.amount}</td>
      <td>${tx.date}</td>
    </tr>`;
  });
}
