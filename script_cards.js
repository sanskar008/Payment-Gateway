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

  console.log("Card Holder Name:", cardHolderName);
  console.log("Card Number:", cardNumber);
  console.log("Expiry Date:", expiryDate);
  console.log("CVV:", cvv);

  connection.query(
    "INSERT INTO card_payments (card_holder_name, card_number, expiry_date, cvv) VALUES (?, ?, ?, ?)",
    [cardHolderName, cardNumber, expiryDate, cvv],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Error inserting card payment details into database:",
          error
        );
        res
          .status(500)
          .send("Error inserting card payment details into database");
        return;
      }

      console.log("Card payment details inserted successfully:", results);

      const message = `Card Holder Name: ${cardHolderName}\nCard Number: ${cardNumber}\nExpiry Date: ${expiryDate}\nCVV: ${cvv}`;
      res.send(message);
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
