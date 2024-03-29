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



module.exports = {
    selectCategory,
    selectReplaceWord,
    addCategory
}