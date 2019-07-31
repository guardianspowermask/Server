const mysql = require('../library/mysql');

async function addReplacement(connection, categoryIdx, replacement){
    const sql = `
    INSERT INTO Guardians.REPLACEMENT (category_idx, name) VALUES (?, ?);
    `;
    await connection.query(sql, [categoryIdx, replacement]);
}

async function insertCategoryTransaction(replacements) {
    await mysql.transaction(async (connection) => {
        // select last category Idx
        const sql = `
        SELECT category_idx FROM Guardians.CATEGORY ORDER BY category_idx DESC LIMIT 1;
        `;
        const categoryIdx = await connection.query(sql);
        const categoryLastIdx = categoryIdx[0].category_idx

        // insert category replacements
         for (let i = 0; i < replacements.length; i++) {
             await addReplacement(connection, categoryLastIdx, replacements[i]);
         }
    });
  }

module.exports = {
    insertCategoryTransaction,
};