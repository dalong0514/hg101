// pages/property/firstproperty/firstproperty.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    superid: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.status = options.status;
    if (this.data.status === '1') {
      this.data.index = options.index;
    } else if (this.data.status === '2') {
      this.data.superid = options.superid;
    }
    
    this.bindFirtData('1', this.data.index);
    this.bindFirtData('2', this.data.superid);
    
  },

  // 绑定本页面数据
  bindFirtData: function(status, data) {
    if (this.data.status === status){
      let propertydata = wx.getStorageSync(data);
      if (propertydata) {
        this.setData({
          firstdata: propertydata,
        });
      } else {
        this.getPropertyData(data);
      }
    }
  },

  // 获取物性数据
  getPropertyData: function(key) {
    let url = 'https://www.hg101.vip/api/property';
    // let url = 'http://127.0.0.1:8000/api/property';
    let typedata = [];
    wx.request({
      url: url,
      data: {
        index: this.data.index,
        superid: this.data.superid,
        id: '',
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
        wx.setStorageSync(key, typedata);
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
    console.log(id);
    wx.navigateTo({
      url: `/pages/property/secondproperty/secondproperty?id=${id}`,
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