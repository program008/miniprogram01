//app.js
var app = getApp()
var plugin = requirePlugin("weather");
App({

  getWeather: function () {
    return plugin;
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("res:",res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function (res) {
        console.log("皮肤：", res.data)
        that.globalData.skin = res.data
      }
    })
  },
  onShow: function () {
    let skin = wx.getStorageSync('skin')
    console.log("onshow-----------",skin)
    this.globalData.skin = skin;
    if (skin == "dark") {
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
  },
  onHide: function () {
    console.log("onhide")
  },
  onError: function (error) {
    console.log("error:", error)
  },

  onPageNotFound: function (res) {
    console.log("onPageNotFound:", res)
  },
  globalData: {
    userInfo: null
  },
  onUnhandledRejection: function (res) {
    console.log("onUnhandledRejection:", res)
  },
  onThemeChange: function (res) {
    console.log("onThemeChange:", res)
  }
})