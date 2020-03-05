// pages/devices/devices.js
const { $Toast } = require('../../lib/iview/base/index');
Page({

  /**
   * Page initial data
   */
  data: {
    search_txt: '',
    loading: true,
    banner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 800,
    product: [],
    type: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getData();
  },

  getData: function() {
    var _that = this;
    wx.request({
      url: 'https://www.hg101.vip/api/home',
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        _that.setData({
          loading: false,
        });
        if(res.data.code == 0) {
          _that.setData({
            banner: res.data.data.banner,
            product: res.data.data.product,
            type: res.data.data.type,
          })
        }
      }),
      fail: (res => {
        $Toast({
          content: '异常错误',
          type: 'error'
        })
      }),
    })
    wx.request({
      url: 'https://www.hg101.vip/api/problem_txt',
      header: {
        "openid": wx.getStorageSync('open_id')
      },
      success: (res => {
        _that.setData({
          loading:false,
        });
        if(res.data.code == 0) {
          _that.setData({
            search_txt: res.data.data.search_txt
          })
        }
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

  productList: (e => {
    var type = e.currentTarget.dataset.label;
    wx.navigateTo({
      url: `/pages/product/product?type=${type}`,
    })
  }),

})
