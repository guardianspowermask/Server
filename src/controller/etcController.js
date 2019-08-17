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

    const result = await etcService.postComment(userIdx, item_idx, content); 

    // already exist comment
    if (result)
      response('항의는 한 번만 할 수 있습니다.', {}, res, 200);

    else
      response('Success', {}, res, 200);

  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);

  }
}

async function getComment(req, res) {
  try {
    const { item_idx } = req.params;

    const result = await etcService.getComment(item_idx); 

    response('Success', result, res, 200);

  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);

  }
}

async function getFeedback(req, res) {
  try {
    const { item_idx } = req.params;

    const result = await etcService.getFeedback(item_idx); 

    response('Success', {img: result[0].img, date: result[0].date}, res, 200);

  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);

  }
}

async function postReport(req, res) {
  try {
    const { user_comment_idx } = req.body;
    const userIdx = getUserIdxFromJwt(req.headers.authorization);

    if (userIdx==null) {
      response('Must be send token.', {}, res, 200);

    } else {
      await etcService.postReport(userIdx, user_comment_idx); 

      response('Success', {}, res, 200);
      
    }

  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);

  }
}

async function putFeedback(req, res) {
  try {
    const { item_idx } = req.body;
    const { file } = req;

    await etcService.putFeedback(item_idx, file); 

    response('Success', {}, res, 200);

  } catch (error) {
    console.log(error);
    errorResponse(error.message, res, error.statusCode);

  }
}

module.exports = {
  postLogin,
  postComment,
  getComment,
  getFeedback,
  postReport,
  putFeedback,
};
