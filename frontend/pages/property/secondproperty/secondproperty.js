// pages/property/secondproperty/secondproperty.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取二级类型页面传来的对象数据
    this.data.id = options.id;
    console.log(this.data.id);
    this.getPropertyData();

  },

  // 获取物性数据
  getPropertyData: function() {
    let url = 'https://www.hg101.vip/api/property';
    // let url = 'http://127.0.0.1:8000/api/property';
    wx.request({
      url: url,
      data: {
        id: this.data.id,
        index: '',
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        let typedata = res.data.data;
        console.log(typedata);
        this.setData({
          detaildata: typedata[0],
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