const storeDao = require('../dao/storeDao');

async function getStore() {
    const result = await storeDao.selectStore();
    return result;
}

async function addStore(name, email, facebook) {
  await storeDao.addStore(name, email, facebook);
}

module.exports = {
    getStore,
    addStore
};
