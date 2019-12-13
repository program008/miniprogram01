// pages/navigation/navigation.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    category: [],
    curTab: 0,
    temIndex:0,
    skinStyle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    
    //https://www.wanandroid.com/navi/json
    this.setData({
      loading: true
    })
    wx.request({
      url: 'https://www.wanandroid.com/navi/json',
      success(res) {
        console.log("请求结果：", res.data)
        that.setData({
          loading: false,
          category: res.data.data
        })
      }
    })
  },
  todetail:function(e){
    var index = e.currentTarget.dataset.index
    var article = this.data.category[this.data.curTab].articles[index]
    wx.navigateTo({
      url: '../webview/webview?link=' + article.link + '&title=' + article.title,
    })
  },
  bindLeftTab: function(e) {
    var index = e.currentTarget.dataset.index
    this.data.temIndex = index
    this.setData({
      curTab: index
    })
  },
  /**
   * 滚动到底部/右边时触发
   */
  bindscrolltolower: function() {
    var currentindex = this.data.curTab
    console.log("滚动到底部了~~", currentindex)
    this.data.temIndex = currentindex
    if (++currentindex < this.data.category.length) {
      this.setData({
        curTab: currentindex
      })
    }
  },
  /**
   * 滚动到顶部/左边时触发
   */
  bindscrolltoupper: function() {
    var currentindex = this.data.curTab
    console.log("滚动到顶部了~~", currentindex)
    console.log("临时的", this.data.temIndex)
    if (this.data.temIndex>=currentindex){
      if (--currentindex >= 0) {
        this.setData({
          curTab: currentindex
        })
      }
    }
    this.data.temIndex = currentindex

    
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