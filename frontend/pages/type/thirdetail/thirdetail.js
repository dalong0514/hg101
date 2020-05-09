// pages/type/thirdetail/thirdetail.js
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
    console.log(this.options.title);
    console.log(this.options.typeclass);
    console.log(this.options.dataurl);
    this.getPumpData();
    this.getTypeSize();
  },

  // 获取设备数据
  getPumpData: function(){
    // let typeurl = 'https://www.hg101.vip/api/' + this.options.dataurl;
    let typeurl = 'http://127.0.0.1:8000/api/' + this.options.dataurl;

    wx.request({
      url: typeurl,
      data: {
        status: 3,
        title: this.options.title,
        keyword: '',
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        let typedata = res.data.data;
        console.log(typedata[0]);
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

  // 获取设备具体参数
  getTypeSize: function(){
    // let typeurl = 'https://www.hg101.vip/api/typesize';
    let typeurl = 'http://127.0.0.1:8000/api/typesize';

    wx.request({
      url: typeurl,
      data: {
        title: this.options.title,
        typeclass: this.options.typeclass,
      },
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        let typedata = res.data.data;
        console.log(typedata);
        this.setData({
          typesize: typedata,
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