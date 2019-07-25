const itemDao = require('../dao/itemDao');
const categoryDao = require('../dao/categoryDao');
const s3Location = require('../../config/s3Config').s3Location;

async function getItem(categoryIdx, order) {
    const result = {};
    const items = [];
    let itemIdxs;
    //categoryIdx -1 이면 전체 item반환
    if (categoryIdx == -1) {
        itemIdxs = await itemDao.selectAllItemIdx();
    } else {
        itemIdxs = await itemDao.selectItemIdx(categoryIdx);
    }

    const itemsLength = itemIdxs.length;
    for (let i = 0; i < itemsLength; i++) {
      const itemIdx = itemIdxs[i].item_idx;
      const item = await itemDao.selectItemDetail(itemIdx);
      item[0].img = s3Location+item[0].img
      const storeIdx = item[0].store_idx;
      const store = await itemDao.selectStoreDetail(storeIdx);
      delete item[0].store_idx;
      delete item[0].date;
      item[0].store = store[0].name;
      item[0].email = store[0].email;
      item[0].facebook = store[0].facebook;
      items.push(item[0]);
    }
    result.total_cnt = itemsLength;
    //sort -> 0 : report_cnt, 1 : date, 2 : name 
    const orderType = getOrderType(order);
    sort(items, orderType.name, orderType.desc);
    result.items = items;
    return result;
}

function getOrderType(order) {
    let name;
    let desc;
    switch(order) {
        case "0":
            name = "report_cnt";
            desc = true;
            break;
        case "1":
            name = "date";
            desc = true;
          break;
        case "2":
            name = "name";
            desc = false;
          break;
        default:
            name = "report_cnt";
            desc = true
      }
      return {name : name, desc :desc};
}

function sort(dataArr, attr, desc) {
    dataArr.sort(function(a, b) {
        var reportA = a[attr];
        var reportB = b[attr];
        if (desc) {
            return (reportA > reportB) ? -1 : (reportA < reportB) ? 1 : 0;
        } else {
            return (reportA < reportB) ? -1 : (reportA > reportB) ? 1 : 0;
        }
    });
}

async function addReport(itemIdx) {
    await itemDao.updateItemReport(itemIdx);
}

async function addItem(name, storeIdx, categoryIdx, file) {
    const img = file.location.split(s3Location)[1];
    await itemDao.insertItem(name, storeIdx, img);
    const itemIdx = await itemDao.selectLastItemIdx();
    const itemLastIdx = itemIdx[0]["LAST_INSERT_ID()"]
    await itemDao.insertItemCategoryPair(itemLastIdx, categoryIdx);
    await categoryDao.updateCategoryItemCnt(categoryIdx);
}

module.exports = {
    getItem,
    addReport,
    addItem,
};
