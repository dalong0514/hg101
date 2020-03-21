// pages/devices/devices.js
// var util = require('../../utils/util.js')
const { $Toast } = require('../../lib/iview/base/index');
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * Page initial data
   */
  data: {
    search_txt: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 800,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 读取缓存中的数据，这里前面一定要加 this，否者其他函数不能调用该数据
    let deviceData = new DBdevice();
    let homedata = deviceData.getDeviceData()
    this.setData({
      homeData: homedata,
      // post: deviceData.getItemById().data
    });
    // console.log(deviceData.getDeviceData().banner);
    // console.log(this.deviceData.getItemById().data);
  },

    // 收藏功能
    onCollectionTap: function (event) {
      var id = event.currentTarget.dataset.id;
      var newData = this.deviceData.collect(id);
      // 重新绑定数据。注意，不要将整个newData全部作为setData的参数，
      // 应当有选择的更新部分数据
      this.setData({
        'post.is_collect': newData.is_collect,
        'post.collect_count': newData.collect_count
      });
  
      // 交互反馈
      wx.showToast({
        title: newData.is_collect ? "收藏成功" : "取消成功",
        duration: 1000,
        icon: "success",
        mask: true
      });
    },
    

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  doSearch: function() {
    wx.navigateTo({
      url: '/pages/devices/search',
    })
  },

  viewProductDetail: function(e) {
    var id = e.currentTarget.dataset.idx;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/devices/detail?id=${id}&type=${type}`,
    })
  },

  doCollect: function(e) {
    let id = e.currentTarget.dataset.idx;
    let product_id = e.currentTarget.dataset.id;
    console.log('doCollect' + id)
    this.collect(id, false, 1, product_id, 2)
  },

  cancelCollect: function(e) {
    let id = e.currentTarget.dataset.idx;
    let product_id = e.currentTarget.dataset.id;
    console.log('cancelCollect' + id)
    this.collect(id, true, 1, product_id, 2);
  },

  collect: function (id, status, entry_type, entry_id, type){
    wx.request({
      method: 'POST',
      url: 'https://www.hg101.vip/api/like',
      header: {
        'openid': wx.getStorageSync('open_id'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        entry_type: entry_type,
        entry_id: entry_id,
        type: type,
      },
      success: (res => {
        let favNum = status ? this.data.product[id].collect_count - 1 : this.data.product[id].collect_count + 1;
        let favNumKey = `product[${id}].collect_count`;
        let isFavKey = `product[${id}].is_collect`;
        this.setData({
          [favNumKey]: favNum,
          [isFavKey]: status? false: true,
        });
      }),
      fail: (res => {

      }),
    })
  },

  more: (() => {
    wx.navigateTo({
      url: '/pages/product/product',
    })
  }),

  productList: (event => {
    var type = event.currentTarget.dataset.label;
    const currentTime = +new Date();
    console.log('Navigate to PageC', currentTime)
    wx.navigateTo({
      url: `/pages/product/product?type=${type}`,
    })
  }),

})
