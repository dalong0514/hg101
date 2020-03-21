// pages/setting/setting.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cache: [
      { iconurl: '/images/tab/device_normal.png', title: '清理缓存', tap: 'clearCache' }
    ],
    settings: [
      { iconurl: '/images/tab/device_normal.png', title: '我的收藏', tap: 'showCollection' },
      { iconurl: '/images/tab/device_normal.png', title: '问题采集', tap: 'showProblem' },
      { iconurl: '/images/tab/device_normal.png', title: '关于我们', tap: 'showIntroduction' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.deviceData = new DBdevice();
    // this.deviceData.getAllDevice();
    // this.deviceData.getItemByCollect();
    // console.log(this.deviceData.getItemByCollect());

  },

  //显示模态窗口
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },

  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },

  // 试验
  sCollection: function(e) {
    // let id = e.currentTarget.dataset.idx;
    // let entry = e.currentTarget.dataset.entry;
    //console.log(entry)
    // let id = 6;
    // let entry = 1;
    wx.navigateTo({
      url: '/pages/setting/collect/collect',
    })
  },

  // 跳转到收藏页
  showCollection: function() {
    wx.navigateTo({
      url: '/pages/setting/collect/collect',
    })
  },

  //跳转到问题采集页
  showProblem: function(){
    wx.navigateTo({
      url: '/pages/problems/problems',
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