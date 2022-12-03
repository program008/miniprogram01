// pages/weui/weui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    buttons: [
      { text: '取消' },
      { text: '确认' }
    ],
    show: false,
        buttons2: [
            {
                type: 'default',
                className: '',
                text: '辅助操作',
                value: 0
            },
            {
                type: 'primary',
                className: '',
                text: '主操作',
                value: 1
            }
        ]
  },
  open: function () {
    this.setData({
      show: true
    })
  },
  buttontap(e) {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },
  /**
   * 对话框回调
   */
  tapDialogButton: function (e) {
    console.log(e.detail)
    this.setData({
      showDialog: false
    })
    if (e.detail.index == 0) {
      console.log("取消")
    } else {
      console.log("确定")
    }
  },
  onShowDialog: function () {
    this.setData({
      showDialog: true
    })
  }
})