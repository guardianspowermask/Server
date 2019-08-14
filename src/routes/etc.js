const express = require('express');

const router = express.Router();

// etcController
const etcController = require('../controller/etcController');

// 로그인
router.post('/login', etcController.postLogin);

// 댓글 달기
router.post('/comment', etcController.postComment);

// 댓글 보기
router.get('/comment/:item_idx', etcController.getComment);

module.exports = router;