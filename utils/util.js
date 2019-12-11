const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


const request = function (obj) {
  //设置cookie缓存
  if (obj.fail) {
    obj.fail = function (err) {
      wx.setStorageSync('cookie', err.header['Set-Cookie']);
      obj.fail(err);
    };
  }
  else {
    obj.fail = function (err) {
      wx.setStorageSync('cookie', err.header['Set-Cookie']);
    };
  }
  if (obj.success) {
    obj.success = function (res) {
      wx.setStorageSync('cookie', res.header['Set-Cookie']);
      obj.success(res);
    };
  }
  else {
    obj.success = function (res) {
      wx.setStorageSync('cookie', res.header['Set-Cookie']);
    };
  }

  //设置请求头
  if (obj.header) {
    obj.header = {
      'Cookie': wx.getStorageSync('cookie'),
      "Content-Type": "application/x-www-form-urlencoded",
      ...obj.header
    };
  }
  else {
    obj.header = {
      'Cookie': wx.getStorageSync('cookie'),
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  wx.request(obj);
};

module.exports = {
  request: request
};