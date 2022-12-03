// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    repassword: ""
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
  register: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //"https://www.wanandroid.com/user/register"
    var info = e.detail.value
    wx.request({
      url: "https://www.wanandroid.com/user/register",
      method: "POST",
      data: {
        username: info.username,
        password: info.password,
        repassword: info.repassword
      },
      header: {
        // "Content-Type": "json"
        //"content-type": "application/json" // 默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log("注册成功：", res.data)
        if (res.data.errorCode == 0) {
          wx.hideLoading()
          wx.showToast({
            title: "注册成功",
            icon: "success"
          })
          //请求成功退出当前界面 回到上一个界面
          setTimeout(function() {
            var that = this;
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];   //上一页
            prevPage.setData({
              userinfo: info
            })
            
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
      }
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
  clearRePassword: function() {
    console.log("清空密码")
    this.setData({
      repassword: ""
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
  bindRePassword: function(e) {
    var value = e.detail.value
    console.log("输入的密码：" + value)
    this.setData({
      repassword: value
    })
  },
  bindRePassword: function(e) {
    var value = e.detail.value
    console.log("输入的密码：" + value)
    this.setData({
      repassword: value
    })
  }
})