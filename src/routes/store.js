const express = require('express');

const router = express.Router();

// storeController
const storeController = require('../controller/storeController');

// store 보기
router.get('/', storeController.getStore);

// store 등록하기
router.post('/', storeController.addStore);

module.exports = router;