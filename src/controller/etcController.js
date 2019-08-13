const etcService = require('../service/etcService');
const { response, errorResponse } = require('../library/response');

async function postLogin(req, res) {
  try {
    const { kakao_uuid, name } = req.body;
    const result = await etcService.postLogin(kakao_uuid, name); 
    response('Success', result, res, 200);
  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);
  }
}

module.exports = {
  postLogin,
};
