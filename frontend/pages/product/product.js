// pages/product/product.js
var DBdevice = require('../../db/DBdata.js').DBdevice;
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    product: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    let type = options.type
    wx.request({
      url: 'https://www.hg101.vip/api/screen' + (type ? `?type=${type}` : ''),
      header: {
        'openid': wx.getStorageSync('open_id')
      },
      success: function(res) {
        // console.log('page fetching data end time', +new Date() - app.getNavigateTime());
        if(res.data.code == 0) {
          that.setData({
            product: res.data.data
          })
        }
      }
    })
  },

  doCollect: function (e) {
    let id = e.currentTarget.dataset.idx;
    let product_id = e.currentTarget.dataset.id;
    console.log('doCollect' + id)
    this.collect(id, false, 1, product_id, 2)
  },

  cancelCollect: function (e) {
    let id = e.currentTarget.dataset.idx;
    let product_id = e.currentTarget.dataset.id;
    console.log('cancelCollect' + id)
    this.collect(id, true, 1, product_id, 2);
  },

  collect: function (id, status, entry_type, entry_id, type) {
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
          [isFavKey]: status ? false : true,
        });
      }),
      fail: (res => {

      }),
    })
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

  viewProductDetail: function (e) {
    var id = e.currentTarget.dataset.idx;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/devices/detail/detail?id=${id}&type=${type}`,
    })
  },
})
