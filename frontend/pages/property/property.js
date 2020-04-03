// pages/property/property.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { index: '1-300', },
      { index: '301-600', },
      { index: '601-900', },
      { index: '901-1200', },
      { index: '1201-1500', },
      { index: '1501-1800', }, 
      { index: '1801-2100', }, 
      { index: '2101-2400', }, 
      { index: '2401-2700', }, 
      { index: '2701-2828', }, 
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