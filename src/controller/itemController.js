const itemService = require('../service/itemService');
const { jwtCheck } = require('../library/jwtCheck');
const { response, errorResponse } = require('../library/response');
const { getUserIdxFromJwt } = require('../library/jwtCheck');

async function getItem(req, res) {
  try {
    const { categoryIdx, order } = req.params;
    var userIdx = null;
    if(req.headers.authorization){
      jwtCheck(req, res, ()=>{});
      userIdx = getUserIdxFromJwt(req.headers.authorization);
    }

    const result = await itemService.getItem(categoryIdx, order, userIdx);

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
