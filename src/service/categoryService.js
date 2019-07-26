const categoryDao = require('../dao/categoryDao');
const jsonToArray = require('../library/jsonToArray');
const itemDao = require('../dao/itemDao');
const s3Location = require('../../config/s3Config').s3Location;

async function getCategory() {
    const result = [];
    const allItemCount = await itemDao.getItemCount();
    const allItem = {
      "category_idx": -1,
      "name": "전체보기",
      "item_cnt": allItemCount[0]["COUNT(*)"],
      "img": s3Location+"guardians/2019/07/26/iconAll%403x.png",
      "replace_words": []
     };
    result.push(allItem);
    const categories = await categoryDao.selectCategory();
    const categoryLength = categories.length;
    for (let i = 0; i < categoryLength; i++) {
      const categoryIdx = categories[i].category_idx;
      categories[i].img = s3Location+categories[i].img
      const replaceWords = await categoryDao.selectReplaceWord(categoryIdx);
      const replaceWordsArray = jsonToArray.parseObj(replaceWords, "name")
      categories[i].replace_words = replaceWordsArray
      result.push(categories[i]);
    }
    return result;
}

async function postCategory(name, replacements, file) {
  const img = file.location.split(s3Location)[1];
  await categoryDao.addCategory(name, img);
  const categoryIdx = await itemDao.selectLastItemIdx();
  const categoryLastIdx = categoryIdx[0]["LAST_INSERT_ID()"]

  for (let i = 0; i < replacements.length; i++) {
    await categoryDao.addReplacement(categoryLastIdx, replacements[i]);
  }
}

module.exports = {
    getCategory,
    postCategory
};
