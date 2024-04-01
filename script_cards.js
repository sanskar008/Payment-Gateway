var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "sanskar",
  password: "sanskar008",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

function validateForm() {
  var cardHolderName = document.getElementById("card-holder-name").value;
  var cardNumber = document.getElementById("card-number").value;
  var expiryDate = document.getElementById("expiry-date").value;
  var cvv = document.getElementById("cvv").value;

  var errorMessage = "";

  if (
    cardHolderName === "" ||
    cardNumber === "" ||
    expiryDate === "" ||
    cvv === ""
  ) {
    errorMessage = "All fields are required.";
  } else if (!/^[a-zA-Z ]+$/.test(cardHolderName)) {
    errorMessage = "Invalid card holder name.";
  } else if (!/^\d{16}$/.test(cardNumber)) {
    errorMessage = "Invalid card number. Must be 16 digits.";
  } else if (!/^\d{2}\/\d{4}$/.test(expiryDate)) {
    errorMessage = "Invalid expiry date. Must be in MM/YYYY format.";
  } else if (!/^\d{3}$/.test(cvv)) {
    errorMessage = "Invalid CVV. Must be 3 digits.";
  }

  if (errorMessage !== "") {
    document.getElementById("error-message").innerText = errorMessage;
    return false;
  }

  // Proceed with payment
  alert("Payment successful!");
  return true;
}
