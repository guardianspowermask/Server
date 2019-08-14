const etcDao = require('../dao/etcDao');
const etcTransaction = require('../dao/etcTransaction');
const { sign } = require('../library/jwtCheck');

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

async function getComment(item_idx) {
    return await etcDao.selectComment(item_idx);
}

module.exports = {
    postLogin,
    postComment,
    getComment,
};
