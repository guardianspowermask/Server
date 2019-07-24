const mysql = require('../library/mysql');

async function selectCategory(){
    const sql = `
    SELECT * FROM Guardians.CATEGORY;
    `;

    const result = await mysql.query(sql);

    return result;
}

async function selectReplaceWord(categoryIdx){
    const sql = `
    SELECT name FROM Guardians.REPLACEMENT WHERE category_idx = ?;
    `;
    const result = await mysql.query(sql, [categoryIdx]);
    return result;
}

async function addCategory(name, img){
    const sql = `
    INSERT INTO Guardians.CATEGORY (name, img) VALUES (?, ?);
    `;
    await mysql.query(sql, [name, img]);
}

async function addReplacement(categoryIdx, replacement){
    const sql = `
    INSERT INTO Guardians.REPLACEMENT (category_idx, name) VALUES (?, ?);
    `;
    await mysql.query(sql, [categoryIdx, replacement]);
}


async function updateCategoryItemCnt(categoryIdx){
    const sql = `
    UPDATE Guardians.CATEGORY SET item_cnt = item_cnt+1 WHERE category_idx = ?;
    `;
  
    const result = await mysql.query(sql, [categoryIdx]);
  
    return result;
  }

module.exports = {
    selectCategory,
    selectReplaceWord,
    addCategory,
    addReplacement,
    updateCategoryItemCnt
    
}