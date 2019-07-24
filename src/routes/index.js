const express = require('express');

const router = express.Router();

// item route
const item = require('./item');

// category route
const category = require('./category');

// store route
const store = require('./store');

// item 경로의 요청
router.use('/item', item);

// category 경로의 요청
router.use('/category', category);

// store 경로의 요청
router.use('/store', store);

module.exports = router;
