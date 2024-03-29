const express = require('express');

const router = express.Router()

const upload = require('../library/s3Bucket').getMulter('guardians');;

// etcController
const etcController = require('../controller/etcController');

// 로그인
router.post('/login', etcController.postLogin);

// 댓글 달기
router.post('/comment', etcController.postComment);

// 댓글 보기
router.get('/comment/:item_idx', etcController.getComment);

// 피드백 보기
router.get('/feedback/:item_idx', etcController.getFeedback);

// 신고하기
router.post('/report', etcController.postReport);

// 피드백 등록
router.put('/feedback', upload.single('img'), etcController.putFeedback);

module.exports = router;