// pages/type/firstdetail/firstdetail.js
var DBdevice = require('../../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: 'bigclass',
    dataurl: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.dataurl = options.dataurl;
    let pumpdata = wx.getStorageSync("bigclass");
    if (pumpdata) {
      this.setData({
        firstdata: pumpdata,
      });
    } else {
      this.getPumpData(options.dataurl);
    }
  },

  // 获取输送泵数据
  getPumpData: function(urlid){
    let typeurl = 'https://www.hg101.vip/api/' + urlid;
    let typedata = [];
    wx.request({
      url: typeurl,
      data: {
        keyword: this.data.keyword,
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        typedata = res.data.data.reverse();
        console.log(typedata);
        this.setData({
          firstdata: typedata,
        });
        wx.setStorageSync("bigclass", typedata);
      }),
      fail: (res => {
        $Toast({
          content: '异常错误',
          type: 'error'
        })
      }),
    })
  },

  // 跳转到二级类型页
  secondDetail: function (e) {
    let bigclass = e.currentTarget.dataset.bigclass;
    let dataurl = this.data.dataurl;
    let bigurl = dataurl + '#' + bigclass;
    console.log(bigurl);
    wx.navigateTo({
      url: '/pages/type/secondetail/secondetail?bigurl=' + bigurl,
    })
  },

  // 跳转到型号首页
  toHome: function() {
    wx.switchTab({
      url: '/pages/type/type',
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