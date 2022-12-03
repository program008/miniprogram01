// pages/kdetail/kdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    previousMargin: 0,
    nextMargin: 0,
    curPage: 0,
    bottomLoading: false,
    loading: false,
    current: 0,
    cid:0
  },
  //调转详情页
  todetail: function (e) {
    var index = e.currentTarget.dataset.curindex
    console.log("e:", index)
    var article = this.data.articleList[index]
    wx.navigateTo({
      url: '../../packagewebview/pages/webview/webview?link=' + article.link + '&title=' + article.title,
    })
  },
  change: function (e) {
    //console.log("e.detail.current：" + e.detail.current)
    this.setData({
      current: e.detail.current
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      loading: true
    })
    var name = options.name
    var id = options.id
    this.data.cid = id
    console.log(name+", "+id)
    wx.setNavigationBarTitle({
      title: options.name
    })

    setTimeout(function () {
      wx.request({
        url: 'https://www.wanandroid.com/article/list/0/json',
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid")
        },
        data:{
          cid:id
        },
        success: (res) => {
          console.log(res.data.data.datas)
          that.setData({
            articleList: res.data.data.datas,
            loading: false
          })
        }
      })
    }, 1000)
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

  collect: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    console.log("index：" + index)
    var newdata = that.data.articleList
    if (that.data.articleList[index].collect) {
      console.log("设置不选中")
      that.data.articleList[index].collect = false
      unCollectArticle(that.data.articleList[index].id)
      that.setData()
    } else {
      console.log("设置选中")
      that.data.articleList[index].collect = true
      collectArticle(that.data.articleList[index].id)
      that.setData()
    }
    console.log(newdata)
    this.setData({
      articleList: newdata
    })

  },
  onPullDownRefresh() {
    var that = this
    console.log('--------下拉刷新-------')
    //显示动画
    wx.showNavigationBarLoading()
    wx.request({
      url: 'https://www.wanandroid.com/article/list/0/json',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      data: {
        cid: that.data.cid
      },
      success: (res) => {
        console.log(res.data.data.datas)
        wx.stopPullDownRefresh()
        //隐藏动画
        wx.hideNavigationBarLoading()
        that.setData({
          articleList: res.data.data.datas,
          loading: false
        })
      }
    })
  },

  onReachBottom() {
    console.log("上拉加载更多...")
    var that = this
    that.data.curPage++
    this.setData({
      bottomLoading: true
    })
    wx.request({
      url: 'https://www.wanandroid.com/article/list/' + that.data.curPage + '/json',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      data: {
        cid: that.data.cid
      },
      success: (res) => {
        console.log(res.data.data.datas)
        var newData = that.data.articleList
        for (var i = 0; i < res.data.data.datas.length; i++) {
          var data = res.data.data.datas[i];
          console.log("添加数据：" + data)
          newData.push(data)
        }
        this.setData({
          articleList: newData,
          bottomLoading: false
        })
        console.log("现在文章列表的length：" + newData.length + "curPage：" + that.data.curPage)

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

function collectArticle(id) {
  var errorCode = -1
  wx.request({
    url: 'https://www.wanandroid.com/lg/collect/' + id + '/json',
    method: "POST",
    header: {
      'content-type': 'application/json', // 默认值
      'cookie': wx.getStorageSync("sessionid")
    },
    success: (res) => {
      console.log("收藏：", res.data)
      errorCode = res.data.errorCode
    }
  })

  return errorCode
}

function unCollectArticle(id) {
  var errorCode = -1
  wx.request({
    url: 'https://www.wanandroid.com/lg/uncollect_originId/' + id + '/json',
    method: "POST",
    header: {
      'content-type': 'application/json', // 默认值
      'cookie': wx.getStorageSync("sessionid")
    },
    success: (res) => {
      console.log("取消收藏：", res.data)
      errorCode = res.data.errorCode
    }
  })

  return errorCode
}