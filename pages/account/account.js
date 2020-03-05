// pages/account/account.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentTab: 0,
    loading: true,
    like: [],
    collect: [],
    like_count: 0,
    collect_count: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getLikeAndCollect()
  },

  getLikeAndCollect: function() {
    var that = this
    wx.request({
      url: 'https://www.hg101.vip/api/likeList',
      header: {
        'openid': wx.getStorageSync('open_id'),
      },
      success: function(res) {
        console.log(res);
        if(res.data.code == 0) {
          that.setData({
            like_count: res.data.data.like_count,
            collect_count: res.data.data.collect_count,
            like: res.data.data.like,
            collect: res.data.data.collect,
            loading: false,
          })
        }
      }
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

  switchTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    });
  },
  viewProductDetail: function(e) {
    let id = e.currentTarget.dataset.idx;
    let entry = e.currentTarget.dataset.entry;
    console.log(entry)
    wx.navigateTo({
      url: `/pages/devices/detail?id=${id}&type=${entry}`,
    })
  },
  handleCollectSlideDelete({ detail: { id } }) {
    var that = this
    let collect = this.data.collect;
    let collect_index = collect.findIndex(item => item.id == id)
    if(collect_index != -1) {
      let id = collect[collect_index].entry_id
      wx.request({
        url: 'https://www.hg101.vip/api/like',
        method: 'POST',
        header: {
          'openid': wx.getStorageSync('open_id')
        },
        data: {
          entry_type: 1,
          entry_id: id,
          type: 2
        },
        success: function(res) {
          if(res.data.code == 0) {
            collect.splice(collect_index, 1)
            that.setData({
              collect: collect
            })
          }
        }
      })
    }
  },

  handleLikeSlideDelete({ detail: { id } }) {
    var that = this
    let like = this.data.like;
    let like_index = like.findIndex(item => item.id == id)
    if (like_index != -1) {
      let id = like[like_index].entry_id
      wx.request({
        url: 'https://www.hg101.vip/api/like',
        method: 'POST',
        header: {
          'openid': wx.getStorageSync('open_id'),
        },
        data: {
          entry_type: 2,
          entry_id: id,
          type: 1
        },
        success: function(res) {
          if(res.data.code == 0) {
            like.splice(like_index, 1)
            that.setData({
              like: like
            })
          }
        }
      })
    }
  },
})
