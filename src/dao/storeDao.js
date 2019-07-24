const mysql = require('../library/mysql');

async function selectStore(){
    const sql = `
    SELECT store_idx, name FROM Guardians.STORE;
    `;

    const result = await mysql.query(sql);

    return result;
}

async function addStore(name, email, facebook){
    const sql = `
    INSERT INTO Guardians.STORE (name, email, facebook) VALUES (?, ?, ?);
    `;
    await mysql.query(sql, [name, email, facebook]);
}


module.exports = {
    selectStore,
    addStore,
}