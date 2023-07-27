const pg = require("pg");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

//Creating postgres client
var client = new pg.Client(
  "postgres://seaoarcc:UZ9JKUlxZESWAiNF908aK2I-abZYfkoB@john.db.elephantsql.com/seaoarcc"
);

//Connecting to the postgres server
client.connect(function (err) {
  if (err) {
    console.log(`Error connecting to the database: ${err}`);
  } else {
    console.log("Connected to the database successfully.");
  }
});

//create instance of an express app to handle html requests
const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
//host static files
app.use(express.static(path.join(__dirname)));

// Handle form submission
app.post("/submit", (req, res) => {
  console.log(req.body);
  const { name, email, city, pincode } = req.body; // Extract form data

  client.query(
    `INSERT INTO tbl_project (name, email, city, pincode ) VALUES ('${name}', '${email}', '${city}', '${pincode}' );`,
    (err, result) => {
      if (err) {
        console.log("Error Inserting data");
        console.log(`Error: ${err}`);
      } else {
        console.log("Inserted data successfully");
        res.send("");
      }
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log(`Server started at: http://localhost:3000/`);
});
