const mysql = require('../library/mysql');

async function chkExist(connection, item_idx, user_idx){
    const sql = `
    SELECT user_comment_idx FROM USER_COMMENT WHERE item_idx = (?) AND user_idx = (?)
    `;
    
    const result = await connection.query(sql, [item_idx, user_idx]);

    if (result.length != 0)
        return true;
    else
        return false;

}

async function updateReportCnt(connection, item_idx){
    const sql = `
    UPDATE ITEM SET report_cnt = report_cnt+1 WHERE item_idx = ?;    
    `;
    
    await connection.query(sql, [item_idx]);
}

async function insertCommentTransaction(userIdx, item_idx, content) {
    var flag = false;

    await mysql.transaction(async (connection) => {
        // chk already exist
        if (chkExist(connection, item_idx, userIdx)){
            flag = true;
            
        } else {
            // insert commnet
            const sql = `
            INSERT INTO USER_COMMENT (item_idx, user_idx, comment) VALUES (?, ?, ?);
            `;

            await mysql.query(sql, [item_idx, userIdx, content]);

            // increase report cnt
            await updateReportCnt(connection, item_idx);
        }
    });

    if (flag)
        return true;
}

module.exports = {

    insertCommentTransaction,
};
  