const express = require('express');

const router = express.Router();

// etcController
const etcController = require('../controller/etcController');

// 로그인
router.post('/login', etcController.postLogin);

module.exports = router;