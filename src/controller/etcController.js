const etcService = require('../service/etcService');
const { response, errorResponse } = require('../library/response');
const { getUserIdxFromJwt } = require('../library/jwtCheck');

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

async function postComment(req, res) {
  try {
    const { item_idx, content } = req.body;
    const userIdx = getUserIdxFromJwt(req.headers.authorization);

    await etcService.postComment(userIdx, item_idx, content); 

    response('Success', {}, res, 200);

  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);

  }
}

module.exports = {
  postLogin,
  postComment,
};
