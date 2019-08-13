const mysql = require('../library/mysql');

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

module.exports = {
    selectUserIdx,
    insertUser,
};