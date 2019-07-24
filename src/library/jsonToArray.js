function parseObj(dataArr, attr) {
  const res = [];

  for (let i = 0; i < dataArr.length; i++) {
    res.push(dataArr[i][attr]);
  }

  return res;
}

module.exports = {
  parseObj
};