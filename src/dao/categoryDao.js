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

async function selectLastCategoryIdx(){
    const sql = `
    SELECT category_idx FROM Guardians.CATEGORY ORDER BY category_idx DESC LIMIT 1;
    `;
    const result = await mysql.query(sql);
    return result;
}

async function addReplacement(categoryIdx, replacement){
    const sql = `
    INSERT INTO Guardians.REPLACEMENT (category_idx, name) VALUES (?, ?);
    `;
    await mysql.query(sql, [categoryIdx, replacement]);
}

module.exports = {
    selectCategory,
    selectReplaceWord,
    addCategory,
    selectLastCategoryIdx,
    addReplacement,
}