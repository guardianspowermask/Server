const mysql = require('../library/mysql');

async function selectLastItemIdx(connection){
    const sql = `
    SELECT LAST_INSERT_ID();
    `;
    const result = await connection.query(sql);
    return result;
}

async function insertItemCategoryPair(connection,itemIdx, categoryIdx){
    const sql = `
    INSERT INTO Guardians.ITEM_CATEGORY (item_idx, category_idx) VALUES (?, ?);
    `;
    await connection.query(sql, [itemIdx, categoryIdx]);
}


async function updateCategoryItemCnt(connection, categoryIdx){
    const sql = `
    UPDATE Guardians.CATEGORY SET item_cnt = item_cnt+1 WHERE category_idx = ?;
    `;
  
    await connection.query(sql, [categoryIdx]);
}

async function insertItemTransaction(name, storeIdx, img, categoryIdx) {
    await mysql.transaction(async (connection) => {
        // insert item
        const sql = `
        INSERT INTO Guardians.ITEM (name, img, store_idx) VALUES (?, ?, ?);
        `;
        
        await connection.query(sql, [name, img, storeIdx]);

        // select last itemIdx
        const itemIdx = await selectLastItemIdx(connection);
        const itemLastIdx = itemIdx[0]["LAST_INSERT_ID()"]

        // insert item & category
        await insertItemCategoryPair(connection, itemLastIdx, categoryIdx);
        await updateCategoryItemCnt(connection, categoryIdx);
    });

}

module.exports = {
    selectLastItemIdx,
    insertItemCategoryPair,
    updateCategoryItemCnt,
    insertItemTransaction,
};
  