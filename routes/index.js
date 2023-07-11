const express = require('express');

const router = express.Router();

const indexController = require('../controllers/index_controller');

// configuration of route
router.get('/', indexController.index);

module.exports = router;