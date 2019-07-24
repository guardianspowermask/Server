const categoryDao = require('../dao/categoryDao');
const jsonToArray = require('../library/jsonToArray');
const itemDao = require('../dao/itemDao');
const s3Location = require('../../config/s3Config').s3Location;

async function getCategory() {
    const result = [];
    const categories = await categoryDao.selectCategory();
    const categoryLength = categories.length;
    for (let i = 0; i < categoryLength; i++) {
      const categoryIdx = categories[i].category_idx;
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
  console.log("category idx is")
  console.log(categoryIdx)
  console.log("replacements is" + replacements)
  console.log("replacements length is" + replacements.length)
  for (let i = 0; i < replacements.length; i++) {
    await categoryDao.addReplacement(categoryLastIdx, replacements[i]);
  }
}

module.exports = {
    getCategory,
    postCategory
};
