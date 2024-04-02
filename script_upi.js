const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "sanskar",
  password: "sanskar008",
  database: "database_upi",
});

connection.connect();

app.post("/submit-upi", (req, res) => {
  const upi_id = req.body.upi_id;

  console.log("Received UPI ID:", upi_id);

  connection.query(
    "INSERT INTO upi_payments (upi_id) VALUES (?)",
    [upi_id],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting UPI ID into database:", error);
        return res.status(500).send("Error inserting UPI ID into database");
      }

      console.log("UPI ID inserted successfully:", upi_id);

      res.send("UPI ID inserted successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
