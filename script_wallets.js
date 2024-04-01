function submitForm() {
  var selectedWallet = document.getElementById("wallet").value;
  var walletUsername = document.getElementById("wallet-username").value;
  if (selectedWallet === "") {
    alert("Please select your preferred wallet.");
    return false;
  }
  if (walletUsername === "") {
    alert("Please enter your wallet username or ID.");
    return false;
  }
  // Proceed with payment
  alert(
    "Redirecting to " +
      selectedWallet +
      " for payment with username/ID: " +
      walletUsername
  );
  return true;
}
