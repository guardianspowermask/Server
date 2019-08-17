const mysql = require('../library/mysql');
const { makeTimeString } = require('../library/changeTimeString');

async function selectUserIdx(kakao_uuid){
    const sql = `
    SELECT user_idx FROM USER WHERE kakao_uuid = (?);
    `;

    const result = await mysql.query(sql, [kakao_uuid]);

    return result;
}

async function insertUser(kakao_uuid, name){
    const sql = `
    INSERT INTO USER (kakao_uuid, name) VALUES (?, ?);
    `;

    const result = await mysql.query(sql, [kakao_uuid, name]);

    return result;
}

async function selectComment(item_idx){
    const sql = `
    SELECT * FROM USER_COMMENT WHERE item_idx = (?);
    `;

    const result = await mysql.query(sql, [item_idx]);

    for (let i=0; i<result.length; i++){
        result[i].date = makeTimeString(result[i].date);
    }
    return result;
}

async function selectUserNameByUserIdx(user_idx){
    const sql = `
    SELECT name FROM USER WHERE user_idx = (?);
    `;

    const result = await mysql.query(sql, [user_idx]);

    return result
}

async function selectFeedback(item_idx) {
    const sql = `
    SELECT feedback_img AS img, feedback_date AS date FROM ITEM WHERE item_idx =  (?);
    `;

    const result = await mysql.query(sql, [item_idx]);

    return result

}

async function insertCommentReport(userIdx, user_comment_idx) {
    const sql = `
    INSERT INTO REPORT_COMMENT (user_comment_idx, user_idx) VALUES (?, ?);
    `;

    await mysql.query(sql, [user_comment_idx, userIdx]);
}

async function updateFeedback(item_idx, img) {
    const sql = `
    UPDATE ITEM SET feedback_flag = 1, feedback_img = (?), feedback_date = (?) WHERE item_idx = (?);
    `;

    await mysql.query(sql, [img, new Date(), item_idx]);
}
module.exports = {
    selectUserIdx,
    insertUser,
    selectComment,
    selectUserNameByUserIdx,
    selectFeedback,
    insertCommentReport,
    updateFeedback,
};