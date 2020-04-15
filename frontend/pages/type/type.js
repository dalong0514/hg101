// pages/type/type.js
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      { title: '泵系列', dataurl: 'pump', class: 'pump',},
      { title: '离心机', dataurl: 'typedevices', class: 'centrifuge',},
      { title: '换热器', dataurl: 'typedevices', class: 'exchanger',},
      { title: '反应釜', dataurl: 'typedevices', class: 'reactor',} ,
      { title: '干燥机', dataurl: 'typedevices', class: 'dryer',},
      { title: '制氮机', dataurl: 'typedevices', class: 'nitrogen',},
      { title: '压滤机', dataurl: 'typedevices', class: 'filter',},
      { title: '行车', dataurl: 'typedevices', class: 'crane',},
      { title: '蒸发器', dataurl: '', },
      { title: '烘箱', dataurl: '', },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let DBdata = new DBdevice();
    // let another = Object.create(DBdevice);

  },

  // 跳转到一级类型页
  firstDetail: function (e) {
    let dataurl = e.currentTarget.dataset.dataurl;
    let bigclass = e.currentTarget.dataset.class;
    console.log(dataurl);
    if (dataurl === 'pump') {
      wx.navigateTo({
        url: '/pages/type/firstdetail/firstdetail?dataurl=' + dataurl,
      })
    } else if (dataurl === '') {
      wx.navigateTo({
        url: '/pages/blank/blank',
      })
    } else if (dataurl === 'typedevices') {
      wx.navigateTo({
        url: `/pages/type/secondetail/secondetail?bigclass=${bigclass}
          &dataurl=${dataurl}`,
      })
    }
    
  },

  // 跳转到搜索页
  doSearch: function() {
    wx.navigateTo({
      url: '/pages/type/typesearch/typesearch',
    })
  },

  // 跳转到型号首页
  toHome: function() {
    wx.navigateTo({
      url: '/pages/type/type',
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

  },

})