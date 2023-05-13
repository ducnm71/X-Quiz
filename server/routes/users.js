var express = require('express');
var router = express.Router();

const {test} = require('../controllers/userController')

router.get('/', test);

module.exports = router;
