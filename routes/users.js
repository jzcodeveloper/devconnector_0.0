const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middlewares/auth");
const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");

const User = require("../models/User");

// @route   GET api/users/test
// @desc    Test users route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200", //Size
      r: "pg", //Rating
      d: "mm" //Default
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw new Error(err);
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route   POST api/users/login
// @desc    Login user / Returning token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch === true) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: config.get("expiresIn") },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearer " + token,
              decodedUser: payload,
              expiresIn: config.get("expiresIn")
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Returns current user
// @access  Private
router.get("/current", auth, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

// @route   GET api/users/decode
// @desc    Returns decoded user
// @access  Public
router.get("/decode", (req, res) => {
  let token = req.get("Authorization").split(" ")[1];

  jwt.verify(token, config.get("jwtSecret"), (err, decodedUser) => {
    if (err) {
      return res.status(401).json(err);
    }
    return res.json(decodedUser);
  });
});

module.exports = router;
