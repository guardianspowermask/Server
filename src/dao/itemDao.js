const mysql = require('../library/mysql');

async function selectItem(categoryIdx, order){
    const sql = `

    `;

    const result = await mysql.query(sql, [categoryIdx, order]);

    return result;
}

async function updateItemReport(itemIdx){
    const sql = `

    `;

    const result = await mysql.query(sql, [itemIdx]);

    return result;
}

async function insertItem(name, store, email, category, img){
    const sql = `

    `;

    const result = await mysql.query(sql, [name, store, email, category, img]);

    return result;
}

module.exports = {
    selectItem,
    updateItemReport,
    insertItem,
}