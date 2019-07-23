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

module.exports = {
    selectCategory,
    selectReplaceWord
}