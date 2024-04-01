function submitForm() {
  var selectedBank = document.getElementById("bank").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var otp = document.getElementById("otp").value;

  if (selectedBank === "") {
    alert("Please select your bank.");
    return false;
  } else if (username === "" || password === "" || otp === "") {
    alert("Please fill in all fields.");
    return false;
  }

  // Proceed with payment
  alert("Redirecting to " + selectedBank + " netbanking portal.");
  return true;
}
