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

  connection.query(
    "SELECT * FROM upi_payments WHERE upi_id = ?",
    [upi_id],
    (error, results, fields) => {
      if (error) {
        console.error("Error querying database:", error);
        return res
          .status(500)
          .send("An error occurred while processing UPI ID");
      }

      if (results.length > 0) {
        console.log("Payment successful for UPI ID:", upi_id);
        res.send("Payment successful");
      } else {
        console.log("Payment failed for UPI ID:", upi_id);
        res.status(400).send("Payment failed");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
