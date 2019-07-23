const categoryDao = require('../dao/categoryDao');
const jsonToArray = require('../library/jsonToArray');

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

module.exports = {
    getCategory
};
