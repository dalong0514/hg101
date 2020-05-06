// pages/property/harmsecond/harmsecond.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 2,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getHarmData(this.options.hwid);

  },

  // 获取危废品数据
  getHarmData: function(key) {
    let url = 'https://www.hg101.vip/api/harm';
    // let url = 'http://127.0.0.1:8000/api/harm';
    let harmdata = [];
    wx.request({
      url: url,
      data: {
        index: this.options.hwid,
        status: this.data.status,
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        harmdata = res.data.data;
        let results = [];
        for (let key in harmdata) {
          results.push(harmdata[key]);
        }
        console.log(results);
        this.setData({
          haca: this.options.haca,
          detaildata: results,
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