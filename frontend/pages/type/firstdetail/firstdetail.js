// pages/type/firstdetail/firstdetail.js
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
    this.getPumpData();
  },

  // 获取输送泵数据
  getPumpData: function(){
    // let typeurl = 'https://www.hg101.vip/api/pump';
    let typeurl = 'http://127.0.0.1:8000/api/pump';
    let typedata = [];
    wx.request({
      url: typeurl,
      data: {
        status: 1,
        keyword: this.options.bigclass,
        title: '',
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
    let dataurl = 'pump';
    console.log(dataurl);
    console.log(bigclass);
    wx.navigateTo({
      url: `/pages/type/secondetail/secondetail?bigclass=${bigclass}
        &dataurl=${dataurl}`,
    })
  },

  // 跳转到型号首页
  toHome: function() {
    wx.switchTab({
      url: '/pages/type/type',
    })
  },

  // 跳转到搜索页
  doSearch: function() {
    wx.navigateTo({
      url: '/pages/type/typesearch/typesearch',
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