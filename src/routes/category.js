const express = require('express');

const router = express.Router();

const upload = require('../library/s3Bucket').getMulter('goods');

// categoryController
const categoryController = require('../controller/categoryController');

// category 가져오기
router.get('/', categoryController.getCategory);
router.post('/', upload.single('img'), categoryController.postCategory);

module.exports = router;
