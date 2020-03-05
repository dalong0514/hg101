// pages/case/case.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentTab: 0,
    loading: true,
    swiperH: '', //swiper高度
    nowIdx: 0, //当前swiper索引
    activeTagTop: 0,
    inactiveTagTop: 0,
    screenHeight: 0,
    labels: [],
    cases: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var that = this
    this.getLabels();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenHeight: res.screenHeight-50
        })
      },
    });
  },

  getLabels: function() {
    var that = this
    wx.request({
      url: 'https://www.hg101.vip/api/label',
      header: {
        'openid': wx.getStorageSync('open_id')
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.getCase()
          that.setData({
            labels: res.data.data
          })
        }

      }
    })
  },

  getCase: function() {
    var that = this
    wx.request({
      url: `https://www.hg101.vip/api/case`,
      method: 'POST',
      header: {
        'openid': wx.getStorageSync('open_id'),
      },
      success: function(res) {
        var data = res.data.data
        that.setData({
          cases: data,
          loading: false,
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index,
    })
  },
  getHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    var tH = wx.getSystemInfoSync().windowWidth * imgh / imgw - 160;
    console.log(sH)
    this.setData({
      swiperH: sH,
      swiperT: tH + "px",
    })
  },
  //swiper滑动事件
  swiperChange: function(e) {
    this.setData({
      nowIdx: e.detail.current
    })
  },
  viewProductDetail: function (e) {
    var id = e.currentTarget.dataset.idx;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/devices/detail?id=${id}&type=2`,
    })
  },

  doLike: function(e) {
    var _that = this
    var case_id = e.currentTarget.dataset.id
    var id = e.currentTarget.dataset.idx
    var tid = e.currentTarget.dataset.tid;
    console.log(tid)
    wx.request({
      method: 'POST',
      url: 'https://www.hg101.vip/api/like',
      header: {
        'openid': wx.getStorageSync('open_id'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        entry_type: 2,
        entry_id: case_id,
        type: 1,
      },
      success: (res => {
        console.log(_that.data.cases)
        let status = _that.data.cases[tid].list[id].is_like;
        console.log(status)
        let favNum = status ? _that.data.cases[tid].list[id].like_count - 1 : _that.data.cases[tid].list[id].like_count + 1;
        let favNumKey = `cases[${tid}].list[${id}].like_count`;
        let isFavKey = `cases[${tid}].list[${id}].is_like`;
        _that.setData({
          [favNumKey]: favNum,
          [isFavKey]: status ? false : true,
        });
      }),
      fail: (res => {

      }),
    })
  }
})
