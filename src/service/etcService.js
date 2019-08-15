const etcDao = require('../dao/etcDao');
const etcTransaction = require('../dao/etcTransaction');
const { sign } = require('../library/jwtCheck');
const s3Location = require('../../config/s3Config').s3Location;

async function postLogin(kakao_uuid, name) {
    const selectRes = await etcDao.selectUserIdx(kakao_uuid);

    let userIdx = -1;

    if (selectRes.length == 0) {
        // UUID 신규 등록
        const insertRes = await etcDao.insertUser(kakao_uuid, name);
        userIdx = insertRes.insertId;
    } else {
        // 존재하는 UUID의 user_idx
        userIdx = selectRes[0].user_idx;
    }

    // token 발급
    return sign(userIdx);
}

async function postComment(userIdx, item_idx, content) {
    await etcTransaction.insertCommentTransaction(userIdx, item_idx, content);
}

function makeAnonymous(name){
    let anonym = name[0];

    for (let i=1; i<name.length; i++) {
        anonym += '*';
    }

    return anonym
}

async function getComment(item_idx) {
    const comments = await etcDao.selectComment(item_idx);
    
    for (let i=0; i<comments.length; i++) {
        const result = await etcDao.selectUserNameByUserIdx(comments[i].user_idx);
        comments[i].name = makeAnonymous(result[0].name);
    }

    return comments
}

async function getFeedback(item_idx) {
    const result = await etcDao.selectFeedback(item_idx);
    
    result[0].img = s3Location + result[0].img;

    return result
}

module.exports = {
    postLogin,
    postComment,
    getComment,
    getFeedback,
};
