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
    let bigurl = options.bigurl;
    console.log(bigurl);
    let dataurl = bigurl.split('#')[0];
    let bigclass = bigurl.split('#')[1];

    let pumpdata = wx.getStorageSync(dataurl);
    if (pumpdata) {
      let filterdata = pumpdata.filter(item => item.bigclass === bigclass);
      this.setData({
        detaildata: filterdata,
      });
    } else {
      this.getPumpData(dataurl);
    }
    this.data.dataurl = dataurl;
    this.data.bigclass = bigclass;

  },

  // 获取输送泵数据
  getPumpData: function(urlid){
    let typeurl = 'https://www.hg101.vip/api/' + urlid;
    let typedata = [];
    wx.request({
      url: typeurl,
      success: (res => {
        typedata = res.data.data;
        console.log(this.data.dataurl);
        console.log(typedata);
        // 可以在数据里筛选，待实现
        let filterdata = typedata.filter(item => item.bigclass === this.data.bigclass);
        console.log(filterdata);
        this.setData({
          detaildata: filterdata,
        });
        wx.setStorageSync(this.data.dataurl, typedata);
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
    let bigurl = dataurl + '#' + title;
    wx.navigateTo({
      url: '/pages/type/thirdetail/thirdetail?bigurl=' + bigurl,
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