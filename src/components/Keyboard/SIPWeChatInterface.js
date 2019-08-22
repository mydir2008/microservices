function getIsPAD() {
  var isPAD = false;
  var res = wx.getSystemInfoSync()
  var size = (res.screenWidth > res.screenHeight) ? res.screenHeight : res.screenWidth
  if (size > 500) {
    isPAD = true;
  } else {
    isPAD = false;
  }
  return isPAD;
}

module.exports = {
  getIsPAD: getIsPAD
}