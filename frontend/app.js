//app.js
var DBdevice = require('./db/DBdata.js').DBdevice;
App({
  onLaunch: function() {
    // 登录
    if (!wx.getStorageSync('open_id')) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.setStorageSync('code', res.code); 
          wx.request({
            url: 'http://127.0.0.1:8000/api/openid?code=' + res.code,
            // url: 'https://www.hg101.vip/api/openid?code=' + res.code,
            success: function(data) {
              wx.setStorageSync('open_id', data.data.data);
            },
            fail: function(data) {
              
            }
          })
        }
      })
    }

    // 缓存初始化数据库，放这里很多时候还没来得及登录，数据读不出来。此问题待解决
    // var deviceData = new DBdevice()
    // deviceData.getDeviceData()

    // 获取用户信息
    wx.getSetting({
      success: res => {
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
    
  },
  globalData: {
    userInfo: null
  }
})
