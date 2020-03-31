// pages/type/firstdetail/firstdetail.js
var DBdevice = require('../../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [1, 2, 3],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let firstlabel = options.firstlabel;
    console.log(firstlabel);
    let TypeDevicesData = wx.getStorageSync("TypeDevicesData");
    console.log(TypeDevicesData);
    let filterdata = TypeDevicesData.data.filter(item => item.firstlabel === firstlabel);
    console.log(filterdata);

    this.setData({
      typedata: filterdata,
    });

  },

  // 跳转到二级类型页
  secondDetail: function (e) {
    //
    let secondlabel = e.currentTarget.dataset.secondlabel;
    console.log(secondlabel);
    wx.navigateTo({
      url: '/pages/type/secondetail/secondetail?secondlabel=' + secondlabel,
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

  }
})