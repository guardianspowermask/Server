const mysql = require('../library/mysql');

async function updateReportCnt(connection, item_idx){
    const sql = `
    UPDATE ITEM SET report_cnt = report_cnt+1 WHERE item_idx = ?;    
    `;
    
    await connection.query(sql, [item_idx]);
}

async function insertCommentTransaction(userIdx, item_idx, content) {
    await mysql.transaction(async (connection) => {
        // insert commnet
        const sql = `
        INSERT INTO USER_COMMENT (item_idx, user_idx, comment) VALUES (?, ?, ?);
        `;

        await mysql.query(sql, [item_idx, userIdx, content]);

        // increase report cnt
        await updateReportCnt(connection, item_idx);
    });
}

module.exports = {

    insertCommentTransaction,
};
  