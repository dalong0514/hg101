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
    let pumpdata = wx.getStorageSync(options.dataurl);
    let firstdata = this.getBigClass(pumpdata).sort();
    console.log(firstdata);
    
    this.setData({
      firstdata: firstdata,
    });

  },

  // 获取设备大类的数组
  getBigClass: function(pumpdata) {
    //
    let bigclass = [];
    for (let item of pumpdata) {
      bigclass.push(item.bigclass)
    }
    let newbigclass = Array.from(new Set(bigclass));
    let firstdata = [];
    for (let item of newbigclass) {
      let bigitem = {};
      bigitem.bigclass = item;
      bigitem.dataurl = this.options.dataurl;
      firstdata.push(bigitem);
    }
    return firstdata;
  },

  // 跳转到二级类型页
  secondDetail: function (e) {
    let bigclass = {};
    bigclass.bigclass = e.currentTarget.dataset.bigclass;
    bigclass.dataurl = e.currentTarget.dataset.dataurl;
    console.log(bigclass);
    wx.navigateTo({
      // url: '/pages/type/secondetail/secondetail?bigclass=' + bigclass,
      url: '/pages/type/secondetail/secondetail',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: bigclass
        })
      }
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