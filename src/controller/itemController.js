const itemService = require('../service/itemService');
const { response, errorResponse } = require('../library/response');

async function getItem(req, res) {
  try {
    const { categoryIdx, order } = req.params;

    const result = await itemService.getItem(categoryIdx, order);

    response('Success', result, res, 200);
  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);
  }
}

async function plusItemReport(req, res) {
  try {
    const { itemIdx } = req.params;

    await itemService.addReport(itemIdx);

    response('Success', {}, res, 201);
  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);
  }
}

async function postItem(req, res) {
    try {
      const { name, storeIdx, categoryIdx } = req.body;
      const { file } = req;
     
      await itemService.addItem(name, storeIdx, categoryIdx, file);
  
      response('Success', {}, res, 201);
    } catch (error) {
      console.log(error);
      errorResponse(error.message, res, error.statusCode);
    }
  }

module.exports = {
    getItem,
    plusItemReport,
    postItem,
};
