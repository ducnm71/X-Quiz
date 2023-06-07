const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { genrateToken, decodedAccessToken, generateAccessToken } = require('../utils/generateToken');
const { refreshToken } = require('../controllers/refreshTokenController');
const userModel = require('../models/userModel');
const e = require('express');

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.json({ users });
});

/////
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();
  const userExists = await userModel.findOne({ email: lowerCaseEmail });
  if (userExists) {
    return res.status(400).json({ message: 'User account already exists' });
  }
  const newUser = await userModel.create({ name, email: lowerCaseEmail, password });
  if (newUser) {
    const { accessToken, refreshToken } = await genrateToken(newUser);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: true,
    });
    return res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      message: 'Registered successfully',
    });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid input data' });
  }
});

//
const authLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    const user = await userModel.findOne({ email: lowerCaseEmail });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { accessToken, refreshToken } = await genrateToken(user);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: true,
      });
      return res.json({
        success: true,
        accessToken,
        refreshToken,
        message: 'Logged in sucessfully',
      });
    } else {
      return res.status(401).json({ success: false, message: 'Email or password is incorrect' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const profileUser = asyncHandler(async (req, res) => {
  try {
    const bearerToken = req.get('Authorization');
    const token = bearerToken.split(' ')[1];
    let decoded;
    decoded = decodedAccessToken(token);
    if (decoded?.exp * 1000 < Date.now()) {
      throw new Error('jwt expired');
    }
    const { email } = decoded.user;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      msg: 'loi',
    });
  }
});

//
const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }
  const { name, email, currentPassword, newPassword } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  if (newPassword) {
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
  }
  const updatedUser = await user.save();
  return res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    photoURL: updatedUser.photoURL,
    role: updatedUser.role,
    token: genrateToken(updatedUser._id),
  });
});

///
const updateUserById = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params._id);
  if (!user) {
    res.status(404).json({ message: `Can't find users` });
  }
  const { name, email, isAdmin } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = isAdmin || user.isAdmin;
  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    password: updatedUser.password,
    photoURL: newUser.photoURL,
    isAdmin: updatedUser.isAdmin,
  });
});

//
const deleted = asyncHandler(async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'Deletion failed' });
  }
  res.status(200).json({ message: 'Delete successfully' });
});

module.exports = {
  getUsers,
  register,
  authLogin,
  profileUser,
  updateUser,
  updateUserById,
  deleted,
};
