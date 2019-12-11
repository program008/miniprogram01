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
    current:0,
  },
  change:function(e){
    //console.log("e.detail.current：" + e.detail.current)
    this.setData({
      current: e.detail.current
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //加载框
    // wx.showLoading({
    //   title: '加载中',
    // })

    //toast
    // wx.showToast({
    //   title: '加载成功',
    // })

    //显示对话框
    // wx.showModal({
    //   title: '提示',
    //   content: '确定删除',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    //显示底部选择器
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })

    //动态设置当前页面的标题
    // wx.setNavigationBarTitle({
    //   title: '当前页面'
    // })

    //在当前页面显示导航条加载动画
    //wx.showNavigationBarLoading()

    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#ff0000',
    //   animation: {
    //     duration: 400,
    //     timingFunc: 'easeIn'
    //   }
    // })

    // wx.setBackgroundColor({
    //   backgroundColorTop: '#ffffff', // 顶部窗口的背景色为白色
    //   backgroundColorBottom: '#ffffff', // 底部窗口的背景色为白色
    // })
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
          banners: res.data.data,
          currentIndex: 0,
        })
      }
    })
    setTimeout(function() {
      wx.request({
        url: 'https://www.wanandroid.com/article/list/0/json',
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid")
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

function collectArticle(id){
  var errorCode = -1
  wx.request({
    url: 'https://www.wanandroid.com/lg/collect/' + id+'/json',
    method: "POST",
    header: {
      'content-type': 'application/json', // 默认值
      'cookie': wx.getStorageSync("sessionid")
    },
    success: (res) => {
      console.log("收藏：",res.data)
      errorCode = res.data.errorCode
    }
  })

  return errorCode
}

function unCollectArticle(id) {
  var errorCode = -1
  wx.request({
    url: 'https://www.wanandroid.com/lg/uncollect_originId/'+id+'/json',
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