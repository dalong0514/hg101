// pages/type/secondetail/secondetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataurl: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取一级类型页面传来的对象数据
    let firstdata = {};
    let eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      // console.log(data);
      firstdata = data.data;
    });
    console.log(firstdata);

    let pumpdata = wx.getStorageSync(firstdata.dataurl);
    console.log(pumpdata);
    let filterdata = pumpdata.filter(item => item.bigclass === firstdata.bigclass);
    console.log(filterdata);
    this.data.dataurl = firstdata.dataurl;

    this.setData({
      detaildata: filterdata,
    });

  },

  // 跳转到型号首页
  toHome: function() {
    wx.switchTab({
      url: '/pages/type/type',
    })
  },

  // 跳转到三级页面
  thirdDetail: function(e) {
    let bigclass = {};
    bigclass.title = e.currentTarget.dataset.thirdata;
    bigclass.dataurl = this.data.dataurl;
    console.log(bigclass);
    wx.navigateTo({
      url: '/pages/type/thirdetail/thirdetail',
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

  }
})