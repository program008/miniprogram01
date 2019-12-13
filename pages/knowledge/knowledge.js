// pages/knowledge/knowledge.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kdListDatas: [],
    loading: false,
    skinStyle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      loading: true
    })
    wx.request({
      url: 'https://www.wanandroid.com/tree/json',
      success(res) {
          console.log("请求结果：",res.data)
          if(res.data.errorCode == 0){
              that.setData({
                kdListDatas:res.data.data,
                loading:false
              })
          }
      }
    })
  },
  todetail: function (e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    console.log("id:",id)
    console.log("name:", name)
    //var article = this.data.category[this.data.curTab].articles[index]
    wx.navigateTo({
      url: '../kdetail/kdetail?id=' + id + '&name=' + name,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    var skin = app.globalData.skin //"dark"
    that.setData({
      skinStyle: app.globalData.skin
    })

    if (skin == "dark") {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    var skin = app.globalData.skin //"dark"
    that.setData({
      skinStyle: app.globalData.skin
    })

    if (skin == "dark") {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
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

  }
})