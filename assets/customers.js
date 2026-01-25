let newCustomerBtn = document.querySelector(".newCustomer"),
  modalTitle = document.querySelector("#addNewModal .modal-title"),
  form = document.getElementById("myForm"),
  userName = document.getElementById("fullName"),
  phone = document.getElementById("phone"),
  address = document.getElementById("address"),
  statusAction = document.getElementById("status"),
  totalOrders = document.getElementById("totalOrders"),
  lastContactDate = document.getElementById("lastContactDate"),
  notes = document.getElementById("notes"),
  customerInfo = document.getElementById("ordersTable");
submitBtn = document.querySelector(".submit");

let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

let isEdit = false,
  editId;

let deleteId = null;

newCustomerBtn.addEventListener("click", () => {
  ((submitBtn.innerText = "Save"), (modalTitle.innerText = "Add New Customer"));
  isEdit = false;
  form.reset();
});

function showInfo() {
  document
    .querySelectorAll(".customerDetails")
    .forEach((info) => info.remove());
  getData.forEach((element, index) => {
    let createElement = `<tr class="customerDetails">
      <td>${index + 1}</td>
      <td>${element.customerName}</td>
      <td>${element.customerPhone}</td>
      <td>${element.customerAddress}</td>
      <td>${element.customerStatus}</td>
      <td>${element.customerTotalOrders}</td>
      <td>${element.customerLastContact}</td>
      <td>${element.customerNotes}</td>
      <td>
        <i class="fas fa-eye text-secondary me-2" data-bs-toggle="modal" data-bs-target="#readData" onclick="readInfo('${
          element.customerName
        }', 
          '${element.customerPhone}', '${element.customerAddress}', '${
            element.customerStatus
          }',
          '${element.customerTotalOrders}', '${
            element.customerLastContact
          }', '${element.customerNotes}')" style="cursor:pointer;"></i>
        <i class="fas fa-edit text-secondary me-2" data-bs-toggle="modal" data-bs-target="#addNewModal" onclick="editInfo(${index}, '${
          element.customerName
        }', 
          '${element.customerPhone}', '${element.customerAddress}', '${
            element.customerStatus
          }',
          '${element.customerTotalOrders}', '${
            element.customerLastContact
          }', '${element.customerNotes}')" style="cursor:pointer;"></i>
        <i class="fas fa-trash text-secondary" data-bs-toggle="modal" data-bs-target="#deleteModal"
          onclick="openDeleteModal(${index})"
          style="cursor:pointer;">
        </i>
      </td>
    </tr>`;
    customerInfo.innerHTML += createElement;
  });
}
showInfo();

function readInfo(
  name,
  phone,
  address,
  status,
  totalOrders,
  lastContactDate,
  notes,
) {
  ((document.querySelector("#showFullname").value = name),
    (document.querySelector("#showPhone").value = phone),
    (document.querySelector("#showAddress").value = address),
    (document.querySelector("#showStatus").value = status),
    (document.querySelector("#showTotalOrders").value = totalOrders),
    (document.querySelector("#showLastContactDate").value = lastContactDate),
    (document.querySelector("#showNotes").value = notes));
}

function editInfo(
  index,
  cName,
  cPhone,
  cAddress,
  cStatus,
  cTotalOrders,
  cLastContactDate,
  cNotes,
) {
  isEdit = true;
  editId = index;
  userName.value = cName;
  phone.value = cPhone;
  address.value = cAddress;
  statusAction.value = cStatus;
  totalOrders.value = cTotalOrders;
  lastContactDate.value = cLastContactDate;
  notes.value = cNotes;

  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update Information";
}

function openDeleteModal(index) {
  deleteId = index;
}
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (deleteId != null) {
    getData.splice(deleteId, 1);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
    deleteId = null;
  }

  const deleteModal = bootstrap.Modal.getInstance(
    document.getElementById("deleteModal"),
  );
  deleteModal.hide();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = {
    customerName: userName.value,
    customerPhone: phone.value,
    customerAddress: address.value,
    customerStatus: statusAction.value,
    customerTotalOrders: totalOrders.value,
    customerLastContact: lastContactDate.value,
    customerNotes: notes.value,
  };

  if (!isEdit) {
    getData.push(information);
  } else {
    isEdit = false;
    getData[editId] = information;
  }

  localStorage.setItem("userProfile", JSON.stringify(getData));

  submitBtn.innerText = "Save";
  modalTitle.innerText = "Add New Customer";

  showInfo();
  form.reset();
});

// search bar

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase().trim();
  const customersRow = document.querySelectorAll(
    "#ordersTable tr.customerDetails",
  );

  customersRow.forEach((row) => {
    const rowText = row.textContent.toLowerCase();

    if (rowText.includes(keyword)) {
      row.style.display = ""; // show (table-row)
    } else {
      row.style.display = "none"; // hide
    }
  });
});

// count customers
// function countCustomers() {
//   const customersRow = document.querySelectorAll(
//     "#ordersTable tr.customerDetails",
//   );

//   let count = 0;
//   customersRow.forEach(() => {
//     count += 1;
//   });

//   return count;
// }

// After you load / add / edit / delete customers → update the count in localStorage
function updateCustomerCountInStorage() {
  const rows = document.querySelectorAll("#ordersTable tr");
  const count = rows.length;
  localStorage.setItem("totalCustomers", count);

  // Optional: also dispatch event if dashboard is already open
  window.dispatchEvent(new Event("customersChanged"));
}

// Call this function whenever the table changes:
// - after page load / data fetch
// - after adding a customer
// - after deleting a customer
// - after any bulk operation

// Example: after initial load
document.addEventListener("DOMContentLoaded", () => {
  // ... your existing code that loads customers ...
  updateCustomerCountInStorage();
});

// Example: after successful add
document.querySelector("#myForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // ... your add logic ...
  // then:
  updateCustomerCountInStorage();
}); 
