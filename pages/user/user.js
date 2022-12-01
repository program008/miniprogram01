// pages/user/user.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "登录",
    userInfo: {},
    hasUserInfo: false,
    switchChecked: false,
    skinStyle: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    today: {},
    checkInDate:"",
    checkOutDate:""
  },
  switchChange: function (e) {
    var value = e.detail.value
    console.log("当前携带的value ", value)
    var that = this
    //设置全局变量
    if (e.detail.value == true) {
      app.globalData.skin = "dark"
    } else {
      app.globalData.skin = ""
    }
    //保存信息
    that.setData({
      skinStyle: app.globalData.skin
    })

    //保存到本地
    wx.setStorage({
      key: "skin",
      data: app.globalData.skin
    })

    //设置顶部的样式
    if (value) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })

      wx.setTabBarStyle({
        color: '#999999',
        selectedColor: '#fff',
        backgroundColor: '#333333',
        borderStyle: 'white'
      })
    } else {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#2196f3',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })

      wx.setTabBarStyle({
        color: '#CCCCCC',
        selectedColor: '#2196f3',
        backgroundColor: '#ffffff',
        borderStyle: 'white'
      })
    }

    //切换完成皮肤，需要重启小程序
    wx.switchTab({
      url: '../../pages/user/user',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    (async () => {
      //天气
      let { today1 } = await app.getWeather().retrieveWeatherData()

      this.setData({ 
        today : today1
       })
    })();

  },
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    var that = this
    var skin = app.globalData.skin //"dark"
    console.log(`皮肤状态：${skin}`)
    that.setData({
      skinStyle: app.globalData.skin,
      switchChecked: skin
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

    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    console.log(`日期返回值：${getDate}`)
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  collectpage: function () {
    console.log("打开我的收藏页")
    wx.navigateTo({
      url: '../collect/collect',
    })
  },

  aboutpage: function () {
    console.log("打开关于我们页")
    wx.navigateTo({
      url: '../aboutwe/aboutwe',
    })
  },
  login: function () {
    console.log("打开登录页")
    wx.navigateTo({
      url: '../login/login',
    })

  },
  onShow: function () {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    console.log("getDate",getDate)
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate
    })

    var name = wx.getStorageSync("username")
    if (name != null && name != "") {
      this.setData({
        username: name
      })
    }
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
  }
})