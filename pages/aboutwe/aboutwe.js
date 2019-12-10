// pages/aboutwe/aboutwe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutwe: "",
    appname:"miniprogram"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var fileSystemManager = wx.getFileSystemManager()
    // var filestr = fileSystemManager.readFileSync("/assets/aboutwe.txt", 'utf-8')
    // console.log(filestr)
    fileSystemManager.readFile({
      filePath:"/assets/aboutwe.txt",
      encoding:"utf-8",
      success: res=>{
        console.log("文本信息：" + res.data)
        that.setData({
          aboutwe: res.data
        })
      },
      fail: err=>{
        console.log("读取文件失败：" + err.errMsg)
      }
    })
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

  }
})