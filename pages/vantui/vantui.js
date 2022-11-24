// pages/vantui/vantui.js
var myBehavior = require('../../behavior/my-behavior.js')
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  behaviors: [myBehavior],
  data: {

  },
  helloMINA: function () {
    common.sayHello('MINA')
  },
  goodbyeMINA: function () {
    common.sayGoodbye('MINA')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.sharedText === 'This is a piece of data shared between pages.'
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})