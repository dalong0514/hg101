// pages/type/type.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ["泵阀类", "分离设备", "混合设备", "传热设备", "传质设备", "输送设备", "反应设备", "辅助设备", "储运设备", "制冷设备", "其他设备"],

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

  },

  // 跳转到搜索页
  doSearch: function() {
    wx.navigateTo({
      url: '/pages/devices/search',
    })
  }

})