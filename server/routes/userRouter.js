const express = require('express');
const router = express.Router();

const { register, authLogin, updateUser, getUsers, deleted, updateUserById } = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { registerValidate, loginValidate } = require('../middleware/validate');

router.get('/admin', protect, isAdmin, getUsers);
router.post('/login', loginValidate, authLogin);
router.post('/register', registerValidate, register);
router.put('/profile', protect, updateUser);
router.put('/admin/:id', protect, isAdmin, updateUserById);
router.delete('/admin/:id', protect, isAdmin, deleted);

module.exports = router;
