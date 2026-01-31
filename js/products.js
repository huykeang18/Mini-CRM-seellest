document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productFormElement");
  const imgPreview = document.getElementById("productImgPreview");
  const fileInput = document.getElementById("productImgInput");
  const nameInput = document.getElementById("productName");
  const priceInput = document.getElementById("productPrice");
  const stockInput = document.getElementById("productStock");
  const descriptionInput = document.getElementById("productDescription");
  const submitBtn = document.getElementById("submitProductBtn");
  const productContainer = document.getElementById("productContainer");
  const addModal = document.getElementById("productForm");
  const modalTitle = addModal.querySelector(".modal-title");
  const newProductBtn = document.querySelector(".newProduct");

  // ── Delete modal elements ───────────────────────────────────────
  const deleteModalEl = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let isEdit = false;
  let editIndex = null;
  let deleteIndex = null; // ← new: remember which product to delete

  // Preview image
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file && file.size < 1000000) {
      const reader = new FileReader();
      reader.onload = (e) => (imgPreview.src = e.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("File too large! (max 1MB)");
    }
  });

  // Open modal for new product
  newProductBtn.addEventListener("click", () => {
    form.reset();
    imgPreview.src = "image/Logo.png";
    imgPreview.style.width = "150px";
    submitBtn.innerText = "Add Product";
    modalTitle.innerText = "Add Product";
    isEdit = false;

    const bsModal = new bootstrap.Modal(addModal);
    bsModal.show();
  });

  function showProducts() {
    productContainer.innerHTML = "";
    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "col-sm-6 col-md-4 col-lg-2 m-3 product-card";
      card.innerHTML = `
        <div class="p-2" onclick="viewDetails(${index})">
          <img src="${product.img}" alt="${product.name}" class="img-fluid mb-2 rounded product-image-container img">
          <h5 class="product-name pt-2">${product.name}</h5>
          <p class="product-price">US $${product.price}</p>
          <p>In Stock: ${product.stock}</p>
          <div class="product-actions mt-2">
            <button class="btn primary-bg text-white btn-sm me-1" onclick="event.stopPropagation(); editProduct(${index})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); prepareDelete(${index})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;

      productContainer.appendChild(card);
    });
  }

  // Prepare delete → show modal & remember index
  window.prepareDelete = function (index) {
    deleteIndex = index;
    const bsDeleteModal = new bootstrap.Modal(deleteModalEl);
    bsDeleteModal.show();
  };

  // Confirm delete when user clicks "Delete" in modal
  confirmDeleteBtn.addEventListener("click", () => {
    if (deleteIndex !== null) {
      products.splice(deleteIndex, 1);
      localStorage.setItem("products", JSON.stringify(products));
      showProducts();
      deleteIndex = null; // reset
    }
  });

  window.viewDetails = function (index) {
    const p = products[index];
    document.getElementById("detailImg").src = p.img;
    document.getElementById("detailName").innerText = p.name;
    document.getElementById("detailPrice").innerText = "Price: US $" + p.price;
    document.getElementById("detailStock").innerText = "Stock: " + p.stock;
    document.getElementById("detailDescription").innerText = p.description;

    const modal = new bootstrap.Modal(
      document.getElementById("productDetailModal"),
    );
    modal.show();
  };

  // Add or Update product
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
      img: imgPreview.src,
      name: nameInput.value.trim(),
      price: priceInput.value,
      stock: stockInput.value,
      description: descriptionInput.value.trim(),
    };

    if (isEdit) {
      products[editIndex] = product;
      isEdit = false;
    } else {
      products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    showProducts();

    bootstrap.Modal.getInstance(addModal).hide();
  });

  window.editProduct = function (index) {
    isEdit = true;
    editIndex = index;
    const p = products[index];

    imgPreview.src = p.img;
    nameInput.value = p.name;
    priceInput.value = p.price;
    stockInput.value = p.stock;
    descriptionInput.value = p.description || "";
    submitBtn.innerText = "Update Product";
    modalTitle.innerText = "Update Product";
    imgPreview.style.width  = "200px";
    // imgPreview.style.height = "210px";

    const bsModal = new bootstrap.Modal(addModal);
    bsModal.show();
  };

  // Search products
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    document.querySelectorAll(".product-card").forEach((card) => {
      const name = card
        .querySelector(".product-name")
        .textContent.toLowerCase();
      card.style.display = name.includes(keyword) ? "block" : "none";
    });
  });

  // Initial render
  showProducts();
});
