const mysql = require('../library/mysql');

async function selectCategory(){
    const sql = `

    `;

    const result = await mysql.query(sql);

    return result;
}



module.exports = {
    selectCategory,
}