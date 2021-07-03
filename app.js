const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000 || process.env.PORT;

//Middlewares
app.use(express.json({ extended: false }));
app.use(cors());

//Defining Routes


app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
