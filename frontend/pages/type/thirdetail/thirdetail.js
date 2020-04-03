// pages/type/thirdetail/thirdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataurl: '',
    title: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取二级类型页面传来的对象数据
    let bigurl = options.bigurl;
    let bigclass = bigurl.split('#')[0];
    let title = bigurl.split('#')[1];
    //绑定数据
    let pumpdata = wx.getStorageSync(bigclass);
    if (pumpdata) {
      let filterdata = pumpdata.filter(item => item.title === title);
      this.setData({
        detaildata: filterdata[0],
      });
    } else {
      this.getPumpData(dataurl);
    }

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