const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfrirm: req.body.passwordConfrirm,
  });

  const token = signToken(newUser._id); //cerated a new token for the Id. that id is generated form mongoDb.beacuse we have USerModel which we have connected to mongodb.

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
  console.log(signToken);
};

exports.login = async (req, res, next) => {
  //this is javascript destructuring in es6.
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .json({
        status: 'error',
      })
      .status(400);
  }

  const user = await User.findOne({ email }).select('+password');
  // console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next('Incorrect email or password');
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'Sucsess',
    token,
  });
};

exports.protect = async (req, res, next) => {
  //1.getting token and check if it's there
  let token;
  if (
    req.headers.authorization && //here authorization measns the key in the postman headers.
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; //here after.split() that [1] is is the second element in the array that is value of header in postman first element is Bearer.
  }
  console.log(token);

  if (!token) {
    return next(res.status(401), 'prat');
  }
  //2.verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //3.check if user still exists.
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(res.status(401));
  }
  //4.check if user changed password after token was issues.

  next();
};
