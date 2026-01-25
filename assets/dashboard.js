document.addEventListener("DOMContentLoaded", () => {
  const countEl = document.getElementById("customerCount"); // or .customer-count

  function showCustomerCount() {
    const count = localStorage.getItem("totalCustomers") || "0";
    if (countEl) countEl.textContent = count;
  }

  showCustomerCount();

  // Update live if user has customers.html open in another tab
  window.addEventListener("customersChanged", showCustomerCount);
  window.addEventListener("storage", (e) => {
    if (e.key === "totalCustomers") {
      showCustomerCount();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("ordersTable");
  tbody.innerHTML = ""; // clear

  const data = [
    {
      id: 1,
      name: "Sokha Meas",
      phone: "012 345 678",
      address: "Phnom Penh",
      status: "Active",
      orders: 12,
      last: "2026-01-20",
      notes: "Prefers evening calls",
    },
    {
      id: 2,
      name: "Chantha Lim",
      phone: "098 765 432",
      address: "Siem Reap",
      status: "Inactive",
      orders: 3,
      last: "2024-11-15",
      notes: "",
    },
    {
      id: 3,
      name: "Vannak Chea",
      phone: "085 123 456",
      address: "Battambang",
      status: "Active",
      orders: 8,
      last: "2026-01-22",
      notes: "VIP customer",
    },
    {
      id: 4,
      name: "Sreyneang Pov",
      phone: "017 987 654",
      address: "Kampong Cham",
      status: "Pending",
      orders: 0,
      last: "2026-01-10",
      notes: "New lead",
    },
    {
      id: 5,
      name: "Rithy Sam",
      phone: "093 456 789",
      address: "Phnom Penh",
      status: "Active",
      orders: 25,
      last: "2025-12-23",
      notes: "Bulk order pending",
    },
  ];

  data.forEach((customer) => {
    const tr = document.createElement("tr");

    const cells = [
      customer.id,
      customer.name,
      customer.phone,
      customer.address,
      customer.status, 
      customer.orders,
      customer.last,
      customer.notes || "—",
      `
        <button class="btn btn-sm btn-successful"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-successful"><i class="fas fa-trash"></i></button>
      `,
    ];

    cells.forEach((content) => {
      const td = document.createElement("td");
      td.innerHTML = content;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

});
