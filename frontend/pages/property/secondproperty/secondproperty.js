// pages/property/secondproperty/secondproperty.js
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
    // 获取二级类型页面传来的对象数据
    let bigurl = options.bigurl;
    let id = bigurl.split('#')[0];
    let index = bigurl.split('#')[1];
    console.log(bigurl);
    console.log(id);
    let propertydata = wx.getStorageSync(index);
    console.log(propertydata);
    // 传过来的参数是字符串需转为数字
    let filterdata = propertydata.filter(item => item.id === parseInt(id));
    console.log(filterdata[0]);
    this.setData({
      detaildata: filterdata[0],
    });

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