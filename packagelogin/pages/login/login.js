// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页
    if (currPage.data.userinfo) {
      //调取接口操作
      var info = currPage.data.userinfo;
      console.log("返回数据", currPage.data.userinfo)
      that.setData({
        username:info.username,
        password:info.password
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  login: function(e) {
    wx.showLoading({
      title: '登录中...'
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //"https://www.wanandroid.com/user/login"
    var info = e.detail.value
    console.log("info.username=" + info.username + "info.password=" + info.password)
    wx.request({
      url: 'https://www.wanandroid.com/user/login',
      method: 'POST',
      data: {
        username: info.username,
        password: info.password
      },
      header: {
        //'content-type': 'application/json' // 默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log("请求成功1：", res.data)
        if (res.data.errorCode == 0) {
          var cookie = res.header["Set-Cookie"];
          if (cookie != null) {
            wx.setStorageSync("sessionid", res.header["Set-Cookie"])
            wx.setStorageSync("username", info.username)
          }
          console.log("cookie ", cookie)

          wx.hideLoading()
          wx.showToast({
            title: '登录成功',
            icon: "success"
          })
          //请求成功退出当前界面 回到上一个界面
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)

        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.errorMsg,
            icon: "none"
          })
        }

      },
      fail(res) {
        console.log("请求失败：" + res.data)
      },
      complete() {
        console.log("请求完成：")
      }
    })

  },
  register: function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  clearUsername: function() {
    console.log("清空用户名")
    this.setData({
      username: ""
    })
  },
  clearPassword: function() {
    console.log("清空密码")
    this.setData({
      password: ""
    })
  },

  bindUsername: function(e) {
    var value = e.detail.value
    console.log("输入的用户名：" + value)
    this.setData({
      username: value
    })
  },
  bindPassword: function(e) {
    var value = e.detail.value
    console.log("输入的密码：" + value)
    this.setData({
      password: value
    })
  },
})