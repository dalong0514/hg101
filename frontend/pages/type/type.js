// pages/type/type.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { iconurl: '/images/tab/device_normal.png', title: '输送泵', tap: 'showCollection' },
      { iconurl: '/images/tab/device_normal.png', title: '真空泵', tap: 'vacuumPump' },
      { iconurl: '/images/device/lixin.jpg', title: '离心机', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '蒸发器', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '换热器', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '反应釜', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '烘箱', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '干燥机', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '制氮机', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '压滤机', tap: 'showIntroduction' },
      { iconurl: '/images/tab/device_normal.png', title: '行车', tap: 'showIntroduction' },
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
    let filterdata = TypeDevicesData.data.filter(item => item.firstlabel === '真空泵');
    console.log(filterdata);

  },

  // 跳转到一级类型页
  firstDetail: function (e) {
    let firstlabel = e.currentTarget.dataset.firstlabel;
    console.log(firstlabel);
    wx.navigateTo({
      url: '/pages/type/firstdetail/firstdetail?firstlabel=' + firstlabel,
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

  // 跳转到搜索页
  doSearch: function() {
    wx.navigateTo({
      url: '/pages/devices/search',
    })
  }

})