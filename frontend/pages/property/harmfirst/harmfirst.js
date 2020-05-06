// pages/property/harmfirst/harmfirst.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getHarmData();

  },

  // 获取危废品数据
  getHarmData: function() {
    let url = 'https://www.hg101.vip/api/harm';
    // let url = 'http://127.0.0.1:8000/api/harm';
    let harmdata = [];
    wx.request({
      url: url,
      data: {
        index: this.options.index,
        status: this.data.status,
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        harmdata = res.data.data;
        console.log(harmdata);
        this.setData({
          firstdata: harmdata,
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

  // 跳转到二级页面
  toSecond: function(e) {
    let hwid = e.currentTarget.dataset.hwid;
    let haca = e.currentTarget.dataset.haca;
    console.log(hwid);
    wx.navigateTo({
      url: `/pages/property/harmsecond/harmsecond?hwid=${hwid}&haca=${haca}`,
    })
  },

  // 跳转到搜索栏
  doSearch: function() {
    wx.navigateTo({
      url: '/pages/property/prosearch/prosearch',
    })
  },

  // 跳转到型号首页
  toHome: function() {
    wx.switchTab({
      url: '/pages/property/property',
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