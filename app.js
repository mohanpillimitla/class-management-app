const express = require("express");
const app = express();
const port = 3000;
const database = require("./config/database");

//test database connection
database
  .authenticate()
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("hello"));

app.listen(port, () => {
  console.log(`Horror movie app is running on port ${port}.`);
});
