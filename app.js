const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.listen(port, () => {
    console.log(`Horror movie app is running on port ${port}.`);
  });
