const express = require('express');

const router = express.Router();

const indexController = require('../controllers/index_controller');

// configuration of route
router.get('/', indexController.index);

router.post('/create-todo', indexController.create);

router.post('/delete-todo', indexController.delete);

router.get('/edit', indexController.update);

module.exports = router;