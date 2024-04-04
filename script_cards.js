const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "sanskar",
  password: "sanskar008",
  database: "database_cards",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});

app.post("/submit-card-payment", (req, res) => {
  const cardHolderName = req.body.cardHolderName;
  const cardNumber = req.body.cardNumber;
  const expiryDate = req.body.expiryDate;
  const cvv = req.body.cvv;

  connection.query(
    "SELECT * FROM card_payments WHERE card_holder_name = ? AND card_number = ? AND expiry_date = ? AND cvv = ?",
    [cardHolderName, cardNumber, expiryDate, cvv],
    (error, results, fields) => {
      if (error) {
        console.error("Error querying database:", error);
        res.status(500).send("An error occurred while processing payment");
        return;
      }

      if (results.length > 0) {
        console.log("Payment completed");
        res.send("Payment completed");
      } else {
        console.log("Payment failed");
        res.status(400).send("Payment failed");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
