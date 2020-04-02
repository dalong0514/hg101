// pages/type/type.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { iconurl: '/images/device/hg101.jpg', title: '泵系列', tap: 'showCollection', dataurl: 'pump' },
      { iconurl: '/images/device/hg101.jpg', title: '离心机', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '蒸发器', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '换热器', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '反应釜', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '烘箱', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '干燥机', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '制氮机', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '压滤机', tap: 'showIntroduction' },
      { iconurl: '/images/device/hg101.jpg', title: '行车', tap: 'showIntroduction' },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let DBdata = new DBdevice();
    let TypeDevicesData = DBdata.getTypeDevicesData();
    console.log(TypeDevicesData);
    // TypeDevicesData.testdata = this.data.types;
    // let filterdata = TypeDevicesData.data.filter(item => item.firstlabel === '真空泵');
    // console.log(filterdata);
    DBdata.getPumpData(this.data.types[0].dataurl);

  },

  // 跳转到一级类型页
  firstDetail: function (e) {
    let dataurl = e.currentTarget.dataset.dataurl;
    console.log(dataurl);
    wx.navigateTo({
      url: '/pages/type/firstdetail/firstdetail?dataurl=' + dataurl,
    })
  },

  // 跳转到搜索页
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