// pages/type/secondetail/secondetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataurl: '',
    bigclass: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取一级类型页面传来的对象数据
    this.data.bigclass = options.bigclass;
    this.data.dataurl = options.dataurl;

    let pumpdata = wx.getStorageSync(this.data.bigclass);
    if (pumpdata) {
      this.setData({
        detaildata: pumpdata,
      });
    } else {
      this.getPumpData();
    }

  },

  // 获取输送泵数据
  getPumpData: function(){
    // let typeurl = 'https://www.hg101.vip/api/' + this.data.dataurl;
    let typeurl = 'http://127.0.0.1:8000/api/' + this.data.dataurl;
    let typedata = [];
    wx.request({
      url: typeurl,
      data: {
        keyword: this.data.bigclass,
        title: '',
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        typedata = res.data.data;
        console.log(typedata);
        this.setData({
          detaildata: typedata,
        });
        wx.setStorageSync(this.data.bigclass, typedata);
      }),
      fail: (res => {
        $Toast({
          content: '异常错误',
          type: 'error'
        })
      }),
    })
  },

  // 跳转到型号首页
  toHome: function() {
    wx.switchTab({
      url: '/pages/type/type',
    })
  },

  // 跳转到三级页面
  thirdDetail: function(e) {
    let title = e.currentTarget.dataset.thirdata;
    let dataurl = this.data.dataurl;
    wx.navigateTo({
      url: `/pages/type/thirdetail/thirdetail?title=${title}&dataurl=${dataurl}`,
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

  }
})