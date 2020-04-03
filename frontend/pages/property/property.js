// pages/property/property.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { iconurl: '/images/device/hg101.jpg', index: '0-500', },
      { iconurl: '/images/device/hg101.jpg', index: '501-1000', },
      { iconurl: '/images/device/hg101.jpg', index: '1001-1500', },
      { iconurl: '/images/device/hg101.jpg', index: '1501-2000', },
      { iconurl: '/images/device/hg101.jpg', index: '2001-2500', },
      { iconurl: '/images/device/hg101.jpg', index: '2501-2828', }, 
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 跳转到一级类型页
  toFirst: function (e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '/pages/property/firstproperty/firstproperty?index=' + index,
    })
  },

  // 跳转到搜索栏
  doSearch: function() {
    wx.navigateTo({
      url: '/pages/devices/search',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})