// pages/project/project.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [],
    projects: [],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    scrollLeft: 0,
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
    //获取项目列表
    wx.request({
      url: 'https://www.wanandroid.com/project/tree/json',
      success(res) {
        console.log("获取项目列表", res.data)
        that.setData({
          categorys: res.data.data
        })

        projectList(that, that.data.categorys[0].id)
      },
      fail(res) {
        console.log("请求失败")
      }
    })

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }

    })
  },
  //调转详情页
  todetail:function(e){
    var index = e.currentTarget.dataset.curindex
    console.log("e:",index)
    var project = this.data.projects[index]
    wx.navigateTo({
      url: '../webview/webview?link='+project.link+'&title='+project.title,
    })
  },

  /**
   * 顶部导航改变事件，即被点击了
   * 1、如果2次点击同一个当航，则不做处理
   * 2、需要记录本次点击和上次点击的位置
   */
  topNavChange: function(e) {
    var _this = this
    var nextActiveIndex = e.currentTarget.dataset.current
    var currentIndex = _this.data.currentTab
    projectList(_this, _this.data.categorys[currentIndex].id)
    console.log(currentIndex)
    if (currentIndex != nextActiveIndex) {
      _this.setData({
        currentTab: nextActiveIndex,
        prevIndex: currentIndex
      });
    }
  },
  /**
   * swiper滑动时触发
   * 1、prevIndex != currentIndex 表示的是用手滑动 swiper组件
   * 2、prevIndex = currentIndex  表示的是通过点击顶部的导航触发的
   */
  swiperChange: function(e) {
    var that = this;
    var prevIndex = this.data.currentTab,
      currentIndex = e.detail.current;
    console.log("当前页：", currentIndex)
    projectList(that, that.data.categorys[currentIndex].id)
    this.setData({
      currentTab: currentIndex
    });
    if (prevIndex != currentIndex) {
      this.setData({
        prevIndex: prevIndex
      });
    }

    this.scrollTopNav();
  },
  /**
   * 滚动顶部的导航栏
   * 1、这个地方是大致估算的
   */
  scrollTopNav: function() {
    var _this = this
    // 当激活的当航小于4个时，不滚动
    if (_this.data.currentTab <= 3 && _this.data.scrollLeft >= 0) {
      _this.setData({
        scrollLeft: 0
      });
    } else {
      //当超过4个时，需要判断是向左还是向右滚动，然后做相应的处理
      var currentTab = _this.data.currentTab > _this.data.prevIndex ? _this.data.currentTab - _this.data.prevIndex : _this.data.prevIndex - _this.data.currentTab
      var plus = (_this.data.currentTab > _this.data.prevIndex ? 70 : -70) * currentTab;
      console.log(currentTab)
      console.log(_this.data.scrollLeft)
      _this.setData({
        scrollLeft: _this.data.scrollLeft + plus
      });
    }
    console.info(_this.data.currentTab, _this.data.prevIndex, _this.data.scrollLeft);
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
    var skin = app.globalData.skin.trim()//"dark"
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

function projectList(that, id) {
  that.setData({
    loading: true
  })
  console.log("id=",id)
  wx.request({
    url: 'https://www.wanandroid.com/project/list/1/json',
    data: {
      cid: id
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      that.setData({
        projects: res.data.data.datas,
        loading:false
      })
    },
    fail(res) {
      console.log("请求失败: ", res)
    }
  })
}