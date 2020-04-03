// pages/property/firstproperty/firstproperty.js
var DBdevice = require('../../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let deviceData = new DBdevice();
    deviceData.getPropertyData();
    let res = wx.getStorageSync("PropertyData");
    this.setData({
      product: res,
    });

    let index = options.index;
    console.log(index);

    this.getPropertyData('property');

  },

  // 获取物性数据
  getPropertyData: function(urlid){
    // let typeurl = 'https://www.hg101.vip/api/' + urlid;
    let url = 'http://127.0.0.1:8000/api/' + urlid;
    let typedata = [];
    wx.request({
      url: url,
      success: (res => {
        typedata = res.data.data;
        console.log(typedata);
        this.setData({
          firstdata: typedata,
        });
        wx.setStorageSync(this.options.dataurl, typedata);
      }),
      fail: (res => {
        $Toast({
          content: '异常错误',
          type: 'error'
        })
      }),
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

  }
})