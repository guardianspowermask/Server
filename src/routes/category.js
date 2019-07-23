const express = require('express');

const router = express.Router();

// categoryController
const categoryController = require('../controller/categoryController');

// category 가져오기
router.get('/category', categoryController.getCategory);

module.exports = router;
