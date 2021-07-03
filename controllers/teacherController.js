const models = require("../models");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginAdmin = async (req, res) => {
  //validating input
  const schema = Joi.object({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
  }
  const { email, password } = req.body;
  try {
    //See if Admin exists
    let admin = await models.Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).send("Invalid Credentials");

    // Check for Password
    const isMatch = await bcrypt.compare(
      password,
      admin.get({ plain: true }).password
    );
    if (!isMatch) return res.status(400).send("Invalid Credentials");

    //Return JWT
    const payload = {
      admin: {
        id: admin.get({ plain: true }).id,
      },
    };
    jwt.sign(payload, "secretKey", (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {}
};

const createAdmin = async (req, res) => {
  //Validate input
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
  }

  const { name, email, password } = req.body;

  try {
    //Check if admin exists
    let admin = await models.Admin.findOne({ where: { email } });
    if (admin) {
      res.status(400).send("Admin already exists");
    }

    // Encrypting Password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Saving Admin
    const resultAdmin = await models.Admin.create({
      name: name,
      email: email,
      password: hashed,
    });

    // Return JWT
    const payload = {
      admin: {
        id: resultAdmin.get({ plain: true }).id,
      },
    };
    jwt.sign(payload, "sportiSecretKey", (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6N30sImlhdCI6MTYxMjgwNzM2N30.EcmDZjvAQGHAi3pRFvFGKbBfe-QcmZwlN_4efMJKYuY
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getLoggedAdminDetails = async (req, res) => {
  try {
    const admin = await models.Admin.findByPk(req.admin.id, {
      attributes: ["name", "email"],
    });
    res.send(admin.get({ plain: true }));
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.loginAdmin = loginAdmin;
module.exports.createAdmin = createAdmin;
module.exports.getLoggedAdminDetails = getLoggedAdminDetails;
