let eyeIcon = document.getElementById("eyeIcon");
let password = document.getElementById("password");
let icon = eyeIcon.querySelector("i");

eyeIcon.onclick = function () {
  if (password.type == "password") {
    password.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    password.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
};

/*
    eyeIcon.onclick = function () {
      const isHidden = password.type === "password";

      password.type = isHidden ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    };
    */

// hard-coded
function authenticate() {
  let authorized;

  // Get the values from the input fields
  let username = document.getElementById("inputUsername").value;
  let password = document.getElementById("password").value;
  let errorMessage = document.getElementById("errorMessage");

  // Check if the entered username and password match
  if (username === "admin" && password === "@#$1234") {
    errorMessage.classList.add("d-none"); // hide error
    authorized = true;
  } else {
    // show the message below the password if credentials are in correct
    errorMessage.classList.remove("d-none"); // show error
    authorized = false;
  }
  // return true if authorized or false if not
  return authorized;
}
