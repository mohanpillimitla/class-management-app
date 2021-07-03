const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  createAdmin,
  getLoggedAdminDetails,
} = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.post("/login", loginAdmin);
router.post("/create-admin", createAdmin);
router.get("/", auth, getLoggedAdminDetails);
module.exports = router;
