// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    articleList: [],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    curPage: 0,
    bottomLoading: false,
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      loading: true
    })
    //请求轮播图片数据
    wx.request({
      url: 'https://www.wanandroid.com/banner/json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          banners: res.data.data
        })
      }
    })
    setTimeout(function() {
      wx.request({
        url: 'https://www.wanandroid.com/article/list/0/json',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          console.log(res.data.data.datas)
          that.setData({
            articleList: res.data.data.datas,
            loading: false
          })
        }
      })
    },1000)

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  collect: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    console.log("index：" + index)
    var newdata = that.data.articleList
    if (that.data.articleList[index].collect) {
      console.log("设置选中")
      that.data.articleList[index].collect = false
    } else {
      console.log("设置不选中")
      that.data.articleList[index].collect = true
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
        'content-type': 'application/json' // 默认值
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
        'content-type': 'application/json' // 默认值
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

})