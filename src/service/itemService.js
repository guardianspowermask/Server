const itemDao = require('../dao/itemDao');

async function getItem(categoryIdx, order) {
    const result = await itemDao.selectItem(categoryIdx, order);

    return result;
}

async function addReport(itemIdx) {
    const result = await itemDao.updateItemReport(itemIdx);

    return result;
}

async function addItem(name, store, email, category, files) {

    const img = files.img.location.split(s3Location)[1];

    const result = await itemDao.insertItem(name, store, email, category, img);

    return result;
}

module.exports = {
    getItem,
    addReport,
    addItem,
};
