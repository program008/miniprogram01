// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  register:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  clearUsername:function(){
    console.log("清空用户名")
    this.setData({
      username: ""
    })
  },
  clearPassword:function(){
    console.log("清空密码")
    this.setData({
      password: ""
    })
  },

  bindUsername:function(e){
    var value = e.detail.value
    console.log("输入的用户名：" + value)
    this.setData({
      username:value
    })
  },
  bindPassword: function (e) {
    var value = e.detail.value
    console.log("输入的密码："+value)
    this.setData({
      password: value
    })
  }
})