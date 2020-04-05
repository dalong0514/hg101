// pages/property/firstproperty/firstproperty.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexlist: [],
    index: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    console.log(index);
    this.data.index = index;

    let propertydata = wx.getStorageSync(index);
    if (propertydata) {
      this.setData({
        firstdata: propertydata,
      });
    } else {
      this.getPropertyData();
    }

  },

  // 获取物性数据
  getPropertyData: function() {
    let url = 'https://www.hg101.vip/api/property';
    let typedata = [];
    wx.request({
      url: url,
      data: {
        index: this.data.index,
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        typedata = res.data.data;
        console.log(typedata);
        this.setData({
          firstdata: typedata,
        });
        wx.setStorageSync(this.data.index, typedata);
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
    let id = e.currentTarget.dataset.id;
    let index = this.data.index;
    let bigurl = id + '#' + index;
    console.log(bigurl);
    wx.navigateTo({
      url: '/pages/property/secondproperty/secondproperty?bigurl=' + bigurl,
    })
  },

  // 跳转到搜索栏
  doSearch: function() {
    wx.navigateTo({
      url: '/pages/devices/search',
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