// pages/type/type.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["分类1", "分类2", "分类3", "分类4", "分类5", "分类6", "分类7", "分类8", "分类9", "分类10", "分类11"],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let DBdata = new DBdevice();
    let TypeDevicesData = DBdata.getTypeDevicesData();
    console.log(TypeDevicesData);

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

  }
})