const jwt = require('jsonwebtoken');

const { errorResponse } = require('../library/response');
const { jwtKey, jwtOptions } = require('../../config/jwtConfig');

function getUserIdxFromJwt(authorization) {
  if (!authorization) return undefined;

  const result = jwt.verify(authorization, jwtKey).userIdx;

  return result;
}

function jwtCheck(req, res, next) {
  const { authorization } = req.headers;

  try {
    req.user = jwt.verify(authorization, jwtKey);

    next();
  } catch (error) {
    errorResponse(error.message, res, 401);
  }
}

function sign(userIdx) {
  const payload = {
    userIdx,
  };

  const token = jwt.sign(payload, jwtKey, jwtOptions);

  return token;
}

function verify(authorization) {
  const decoded = jwt.verify(authorization, jwtKey);

  if (!decoded) {
    return -1;
  }
  return decoded;
}

module.exports = {
  jwtCheck,
  sign,
  verify,
  getUserIdxFromJwt,
};
