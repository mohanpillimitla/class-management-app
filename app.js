const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json())
// parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));


// database
const db = require("./models");
const Role = db.role;

//db.sequelize.sync();
//force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to class Management." });
});
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);



// set port, listen for requests
const PORT = 9012 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "student",
  });

  Role.create({
    id: 2,
    name: "teacher",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
