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

module.exports = {
    selectUserIdx,
    insertUser,
    selectComment,
};