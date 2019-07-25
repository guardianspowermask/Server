const express = require('express');

const router = express.Router();

const upload = require('../library/s3Bucket').getMulter('guardians');

// itemController
const itemController = require('../controller/itemController');

// item 가져오기
router.get('/:categoryIdx/:order', itemController.getItem);

// item 항의 증가
router.put('/:itemIdx/report', itemController.plusItemReport);

// item 추가
router.post('/', upload.single('img'), itemController.postItem);

module.exports = router;
