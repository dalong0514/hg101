// pages/problems/problems.js
const {
  $Toast
} = require('../../lib/iview/base/index.js');
Page({

  /**
   * Page initial data
   */
  data: {
    window_height: 0,
    problem_txt: '请您尽量详细的反馈，我们将第一时间帮你解决~'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var _that = this;
    wx.request({
      url: 'https://www.hg101.vip/api/problem_txt',
      header: {
        'openid': wx.getStorageSync('open_id')
      },
      success: function(res) {
        console.log(res)
        if(res.data.code == 0) {
          _that.setData({
            problem_txt: res.data.data.problem_txt
          });
          wx.setNavigationBarTitle({
            title: res.data.data.problem_title,
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        _that.setData({
          window_height: res.windowHeight,
        });
      },
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },
  submitForm: function(e) {
    var problem = e.detail.value.problem;
    var phone_number = e.detail.value.phone_number;
    console.log('problems: ' + problem);
    console.log('phone number: ' + phone_number);
    if (!problem) {
      $Toast({
        content: '内容不能为空',
        type: 'error'
      });
      return;
    }
    wx.request({
      url: 'https://www.hg101.vip/api/problem',
      method: 'POST',
      header: {
        'openid': wx.getStorageSync('open_id'),
      },
      data: {
        'contact': phone_number,
        'describe': problem,
      },
      success: function(res) {
        if (res.data.code == 0) {
          $Toast({
            content: '提交成功',
            type: 'success'
          });
          setTimeout(function() {
            wx.switchTab({
              url: "/pages/problems/problems"
            })
          })
        }
      },
      fail: function(res) {

      }
    });
  }
})
