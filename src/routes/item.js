const express = require('express');

const router = express.Router();

const upload = require('../library/s3Bucket').getMulter('goods');

// itemController
const itemController = require('../controller/itemController');

// item 가져오기
router.get('/item/:categoryIdx/:order', itemController.getItem);

// item 항의 증가
router.put('/item/:itemIdx/report', itemController.plusItemReport);

// item 추가
router.post('/item', upload.single('img'), itemController.postItem);

module.exports = router;
