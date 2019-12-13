Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    curPage: 0,
    bottomLoading: false,
    loading: false,
    current: 0,
    collect:true,
    nulldata:false
  },
  //调转详情页
  todetail: function (e) {
    var index = e.currentTarget.dataset.curindex
    console.log("e:", index)
    var article = this.data.articleList[index]
    wx.navigateTo({
      url: '../webview/webview?link=' + article.link + '&title=' + article.title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      loading: true
    })
    //https://www.wanandroid.com/lg/collect/list/$curPage/json
    setTimeout(function() {
      wx.request({
        url: 'https://www.wanandroid.com/lg/collect/list/' + that.data.curPage + '/json',
        header: {
          'content-type': 'application/json', // 默认值
          'cookie': wx.getStorageSync("sessionid")
        },
        success(res) {
          console.log("请求成功", res.data)
          if (res.data.errorCode != 0) {
            wx.showToast({
              title: res.data.errorMsg,
              icon: "none"
            })

          } else {
            that.setData({
              articleList: res.data.data.datas
            })

            if (res.data.data.datas.length == 0) {
              that.setData({
                nulldata: true
              })
            } else {
              that.setData({
                nulldata: false
              })
            }
          }
        },
        fail(res) {
          console.log("请求失败")
        },
        complete() {
          that.setData({
            loading: false
          })
        }
      })
    }, 1500)
  },

  collect:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    console.log("index",index)
    var id = that.data.articleList[index].id
    var originId = that.data.articleList[index].originId
    //取消收藏
    unCollectArticle(id,originId)

    var that = this
    that.data.curPage = 0
    //显示动画
    wx.showNavigationBarLoading()
    wx.request({
      url: 'https://www.wanandroid.com/lg/collect/list/' + that.data.curPage + '/json',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      success(res) {
        console.log("请求成功", res.data)
        wx.stopPullDownRefresh()
        //隐藏动画
        wx.hideNavigationBarLoading()
        if (res.data.errorCode == 0) {
          that.setData({
            articleList: res.data.data.datas
          })

          if (res.data.data.datas.length == 0){
            that.setData({
              nulldata:true
            })
          }else{
            that.setData({
              nulldata: false
            })
          }
        }
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })

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
    var that = this
    console.log('--------下拉刷新-------')
    that.data.curPage = 0
    //显示动画
    wx.showNavigationBarLoading()
    wx.request({
      url: 'https://www.wanandroid.com/lg/collect/list/' + that.data.curPage + '/json',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      success(res) {
        console.log("请求成功", res.data)
        wx.stopPullDownRefresh()
        //隐藏动画
        wx.hideNavigationBarLoading()
        if (res.data.errorCode == 0) {
          that.setData({
            articleList: res.data.data.datas
          })

          if (res.data.data.datas.length == 0) {
            that.setData({
              nulldata: true
            })
          } else {
            that.setData({
              nulldata: false
            })
          }
        }
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉加载更多...")
    var that = this
    that.data.curPage++
    this.setData({
      bottomLoading: true
    })
    wx.request({
      url: 'https://www.wanandroid.com/lg/collect/list/' + that.data.curPage + '/json',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': wx.getStorageSync("sessionid")
      },
      success(res) {
        console.log("请求成功", res.data)
        if (res.data.errorCode == 0) {
          var newData = that.data.articleList
          for (var i = 0; i < res.data.data.datas.length; i++) {
            var data = res.data.data.datas[i];
            console.log("添加数据：" + data)
            newData.push(data)
          }
          that.setData({
            articleList: newData,
            bottomLoading: false
          })
        }
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

//https://www.wanandroid.com/lg/uncollect/2805/json

function unCollectArticle(id, originid) {
  var errorCode = -1
  wx.request({
    url: 'https://www.wanandroid.com/lg/uncollect/'+id+'/json',
    method: "POST",
    data:{
      originId: originid
    },
    header: {
      // 'content-type': 'application/json', // 默认值
      "Content-Type": "application/x-www-form-urlencoded",
      'cookie': wx.getStorageSync("sessionid")
    },
    success: (res) => {
      console.log("取消收藏成功：", res.data)
      errorCode = res.data.errorCode
    },
    fail(res){
      console.log("取消收藏失败：", res)
    }
  })

  return errorCode
}