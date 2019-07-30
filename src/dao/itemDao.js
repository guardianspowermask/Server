const mysql = require('../library/mysql');

async function selectItemIdx(categoryIdx){
    const sql = `
    SELECT item_idx FROM Guardians.ITEM_CATEGORY WHERE category_idx = ?
    `;

    const result = await mysql.query(sql, [categoryIdx]);

    return result;
}

async function getItemCount(categoryIdx){
    const sql = `
    SELECT COUNT(*) FROM Guardians.ITEM
    `;

    const result = await mysql.query(sql);

    return result;
}


async function selectAllItemIdx(){
    const sql = `
    SELECT item_idx FROM Guardians.ITEM
    `;

    const result = await mysql.query(sql);

    return result;
}


async function selectItemDetail(itemIdx){
    const sql = `
    SELECT * FROM Guardians.ITEM WHERE item_idx = ?
    `;

    const result = await mysql.query(sql, [itemIdx]);

    return result;
}

async function selectStoreDetail(storeIdx){
    const sql = `
    SELECT * FROM Guardians.STORE WHERE store_idx = ?
    `;

    const result = await mysql.query(sql, [storeIdx]);

    return result;
}

async function updateItemReport(itemIdx){
    const sql = `
    UPDATE Guardians.ITEM SET report_cnt = report_cnt+1 WHERE item_idx = ?;
    `;

    const result = await mysql.query(sql, [itemIdx]);

    return result;
}

module.exports = {
    selectItemIdx,
    getItemCount,
    selectAllItemIdx,
    selectItemDetail,
    selectStoreDetail,
    updateItemReport,
}