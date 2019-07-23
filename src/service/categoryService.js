const categoryDao = require('../dao/categoryDao');

async function getCategory() {
    const result = await categoryDao.selectCategory();

    return result;
}

module.exports = {
    getCategory,
};
