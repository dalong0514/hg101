// pages/type/typesearch/typesearch.js
// pages/property/prosearch/prosearch.js
const WxSearch = require('../../../components/wxSearch/wxSearch.js');
const { $Toast } = require('../../../lib/iview/base/index');
Page({
  
  /**
   * Page initial data
   */
  data: {
    search_txt: '设备名称 | 型号',
    search_result: [],
    label: [],
    bottomHeight: 0,
    search_string: ''
  },

  getBottomHeight: function() {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          bottomHeight: res.windowHeight - 60,
        })
      },
    })
  },

  getSearchResult: function (keyword) {
    var that = this;
    wx.request({
      url: 'https://www.hg101.vip/api/typesearch?keyword=' + keyword,
      // url: 'http://127.0.0.1:8000/api/typesearch?keyword=' + keyword,
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: function (res) {
        console.log(res.data.data)
        if(res.data.code == 0) {
          that.setData({
            search_result: res.data.data,
            search_string: keyword
          }) 
        }
      },
      fail: function (res) {
        $Toast({
          content: '错误的提示',
          type: 'error'
        });
      }
    })
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getBottomHeight()
    this.getHotSearch()
  },

  // 跳转到三级页面
  thirdDetail: function(e) {
    let title = e.currentTarget.dataset.thirdata;
    let dataurl = e.currentTarget.dataset.class;
    wx.navigateTo({
      url: `/pages/type/thirdetail/thirdetail?title=${title}&dataurl=${dataurl}`,
    })
  },
  
  getHotSearch: function() {
    let labels = ['磁力泵', '隔膜泵', '离心机'];
    WxSearch.init(this, 40, labels)
  },

  wxSearchFn: function (e) {
    console.log(this.data.wxSearchData.value)
    this.getSearchResult(this.data.wxSearchData.value)
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },

  wxSearchInput: function (e) {
    var that = this
    console.log(e)
    WxSearch.wxSearchInput(e, that);
  },

  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },

  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },

  wxSearchKeyTap: function (e) {
    var type = -1;
    for(let i=0; i<this.data.label.length; i++) {
      if(this.data.label[i].name == e.currentTarget.dataset.key) {
        type = this.data.label[i].id
      }
    }
    if(type != -1) {
      this.getProductByLabelId(type)
    }else {
      this.getSearchResult(e.currentTarget.dataset.key)
    }
    
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },

  wxSearchDeleteKey: function (e) {
    console.log("wxSearchDeleteKey")
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },

  wxSearchDeleteAll: function (e) {
    console.log("wxSearchDeleteAll")
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },

  wxSearchTap: function (e) {
    console.log(e.target.dataset.key)
    var that = this
    that.setData({
      search_string: e.target.dataset.key,
    })
    WxSearch.wxSearchHiddenPancel(that);
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
  
})