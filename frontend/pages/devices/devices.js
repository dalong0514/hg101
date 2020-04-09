// pages/devices/devices.js
// var util = require('../../utils/util.js')
const { $Toast } = require('../../lib/iview/base/index');
var DBdevice = require('../../db/DBdata.js').DBdevice;

Page({

  /**
   * Page initial data
   */
  data: {
    search_txt: '产品',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 800,
    show: true,
    animated: true,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let homedata = wx.getStorageSync("homeData");
    if (homedata) {
      this.setData({
        banner: homedata.banner,
        product: homedata.product,
        type: homedata.type,
      });
    } else {
      this.getHomeData();
    }
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
      url: `/pages/devices/detail/detail?id=${id}&type=${type}`,
    })
  },

  doCollect: function(e) {
    let id = e.currentTarget.dataset.idx;
    let product_id = e.currentTarget.dataset.id;
    console.log('doCollect ' + id);
    this.collect(id, false, 1, product_id, 2);
    // 交互反馈
    wx.showToast({
      title: this.data.like_status!==1 ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    });
  },

  cancelCollect: function(e) {
    let id = e.currentTarget.dataset.idx;
    let product_id = e.currentTarget.dataset.id;
    console.log('cancelCollect ' + id);
    this.collect(id, true, 1, product_id, 2);
    // 交互反馈
    wx.showToast({
      title: this.data.like_status===1 ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    });
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
        this.data.like_status = isFavKey;
        // 局部数据重新绑定
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
      url: '/pages/devices/moreproducts/moreproducts',
    })
  }),

  productList: (event => {
    var type = event.currentTarget.dataset.label;
    // 试验跳转时间
    // const currentTime = +new Date();
    // console.log('Navigate to PageC', currentTime)
    wx.navigateTo({
      url: `/pages/product/product?type=${type}`,
    })
  }),

  // 获取首页信息
  getHomeData: function() {
    wx.request({
      url: 'https://www.hg101.vip/api/home',
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        // 取消加载动画
        console.log('update data');
        this.setData({
          show: false,
        });
        if(res.data.code == 0) {
          this.setData({
            banner: res.data.data.banner,
            product: res.data.data.product,
            type: res.data.data.type,
          });
          wx.setStorageSync("homeData", res.data.data);
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
    // // 更新数据
    // this.getHomeData();
    // // 顶部导航栏显示 loading 状态
    // wx.showNavigationBarLoading();
    // this.timer = setInterval(() => {
    //   // 隐藏 loading 状态
    //   wx.hideNavigationBarLoading();
    // }, 1000)
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

  

})
