// pages/splash/splash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 6
  },
  goHome: function() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setTimeCount()
  },
  //倒计时
  setTimeCount: function() {
    let time = this.data.time;
    time--;
    console.log("倒计时",time);
    if (time <= 0) {
      time = 0;
      wx.switchTab({
        url: '/pages/home/home',
      })
    } else {
      this.setData({
        time: time
      })
      setTimeout(this.setTimeCount, 1000);
    }
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

  }
})