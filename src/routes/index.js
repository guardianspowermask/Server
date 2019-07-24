const express = require('express');

const router = express.Router();

// item route
const item = require('./item');

// category route
const category = require('./category');

// item 경로의 요청
router.use('/item', item);

// category 경로의 요청
router.use('/category', category);

module.exports = router;
