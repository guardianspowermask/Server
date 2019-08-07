const mysql = require('../library/mysql');

async function selectLastItemIdx(connection){
    const sql = `
    SELECT item_idx FROM Guardians.ITEM ORDER BY item_idx DESC LIMIT 1;
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
        const itemLastIdx = itemIdx[0].item_idx

        // insert item & category
        if (Array.isArray(categoryIdx)) {
            //중복 카테고리 일때
            for (let i = 0; i < categoryIdx.length; i++) {  
                const currentcategoryIdx = parseInt(categoryIdx[i]);
                await insertItemCategoryPair(connection, itemLastIdx, currentcategoryIdx);
                await updateCategoryItemCnt(connection, currentcategoryIdx);
            }
        } else {
            //단일 카테고리
            await insertItemCategoryPair(connection, itemLastIdx, categoryIdx);
            await updateCategoryItemCnt(connection, categoryIdx);
        }
    });

}

module.exports = {
    selectLastItemIdx,
    insertItemCategoryPair,
    updateCategoryItemCnt,
    insertItemTransaction,
};
  