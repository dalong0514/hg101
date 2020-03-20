// pages/devices/devices.js
// var util = require('../../utils/util.js')
const { $Toast } = require('../../lib/iview/base/index');
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * Page initial data
   */
  data: {
    types: ["分类1", "分类2", "分类3", "分类4", "分类5", "分类6", "分类7", "分类8", "分类9", "分类10", "分类11"],
    colorValue: 'red',

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let DBdata = new DBdevice();
    let TestData = DBdata.getTestData();
    console.log(TestData);

    /*
    this.setData({
      typeData: this.deviceData.getDeviceData().type[0],
    });
    */
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
