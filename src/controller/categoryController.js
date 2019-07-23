const categoryService = require('../service/categoryService');
const { response, errorResponse } = require('../library/response');

async function getCategory(req, res) {
  try {

    const result = await categoryService.getCategory();

    response('Success', result, res, 200);
  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);
  }
}

module.exports = {
    getCategory,
};
