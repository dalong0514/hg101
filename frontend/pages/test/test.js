// pages/devices/devices.js
// var util = require('../../utils/util.js')
// const reloading = require('../../lib/iview/loading/loading.js');
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * Page initial data
   */
  data: {
    colorValue: 'red',
    show: true,
    // show: false,
    animated: true,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.timer = setInterval(() => {
      this.setData({
        show: !this.data.show
      })
    }, 2000)
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    // clearInterval(this.timer)

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

})
