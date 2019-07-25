const storeService = require('../service/storeService');
const { response, errorResponse } = require('../library/response');

async function getStore(req, res) {
  try {
    const result = await storeService.getStore(); 
    response('Success', result, res, 200);
  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);
  }
}

async function addStore(req, res) {
  try {
    const { name, email, facebook } = req.body;
    
    await storeService.addStore(name, email, facebook);

    response('Success', {}, res, 201);
  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);
  }
}


module.exports = {
    getStore,
    addStore
};