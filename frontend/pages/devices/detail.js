// pages/devices/detail.js
var WxParse = require('../../components/wxParse/wxParse.js');
Page({

  /**
   * Page initial data
   */
  data: {
    currentTab: 0,
    loading: true,
    sliders: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var that = this
    var entry_type = options.type;
    var id = options.id
    var search_string = options.search_string
    wx.request({
      url: `https://www.hg101.vip/api/detail?entry_type=${entry_type}&id=${id}&search_string=${search_string}`,
      header: {
        'openid': wx.getStorageSync('open_id')
      },
      success: function(res) {
        console.log(res.data.data.detail)
        WxParse.wxParse('intro', 'html', res.data.data.detail, that, 5);
        WxParse.wxParse('model', 'html', res.data.data.information, that, 5);
        that.setData({
          sliders: res.data.data.images,
          loading: false,
        })

      }
    })

    // WxParse.wxParse('intro', 'html', this.data.intro, this, 5);
    // WxParse.wxParse('model', 'html', this.data.model, this, 5);
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
  switchTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index,
    });
  }
})
