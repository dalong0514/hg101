// pages/type/secondetail/secondetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    describe: {
      title: "设备名称举例：",
      type: "设备型号：",
      spec: "设备详细规格及其附件：",
      material: "设备材质",
      perweight: "设备单重：",
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let secondlabel = options.secondlabel;
    console.log(secondlabel);
    let TypeDevicesData = wx.getStorageSync("TypeDevicesData");
    let filterdata = TypeDevicesData.data.filter(item => item.type === secondlabel);
    console.log(filterdata[0].equipname);
    filterdata[0].details = this.data.describe;
    console.log(filterdata);

    this.setData({
      detaildata: filterdata,
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