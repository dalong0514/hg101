// pages/property/prosearch/prosearch.js
const WxSearch = require('../../../components/wxSearch/wxSearch.js');
const { $Toast } = require('../../../lib/iview/base/index');
Page({
  
  /**
   * Page initial data
   */
  data: {
    search_txt: '',
    label: [],
    search_result: [],
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
      url: 'https://www.hg101.vip/api/search?keyword=' + keyword,
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

  viewProductDetail: function (e) {
    var id = e.currentTarget.dataset.idx;
    var type = e.currentTarget.dataset.type;
    var search_string = this.data.search_string;
    wx.navigateTo({
      url: `/pages/devices/detail/detail?id=${id}&type=${type}&search_string=${search_string}`,
    })
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getBottomHeight()
    this.getHotSearch()
    this.setSearchTxt()
    //WxSearch.initMindKeys(['mininapp.todaycoder.cn', '微信小程序开发', '微信开发', '微信小程序'])
  },
  setSearchTxt() {
    var _that = this
    wx.request({
      url: 'https://www.hg101.vip/api/problem_txt',
      header: {
        "openid": wx.getStorageSync('open_id')
      },
      success: (res => {
        _that.setData({
          loading: false,
        });
        if (res.data.code == 0) {
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
  getHotSearch: function() {
    var that = this
    wx.request({
      url: 'https://www.hg101.vip/api/type',
      header: {
        "openid": wx.getStorageSync('open_id')
      },
      success: function(res) {
        if(res.data.code == 0) {
          that.setData({
            label: res.data.data
          })
          var labels = []
          for(let i=0; i <res.data.data.length; i++) {
            labels.push(res.data.data[i].name)
          }
          WxSearch.init(that, 40, labels)
        }
      }
    })
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

  getProductByLabelId: function(type) {
    var that = this
    wx.request({
      url: `https://www.hg101.vip/api/screen?type=${type}`,
      header: {
        'openid': wx.getStorageSync('open_id')
      },
      success: function(res) {
        that.setData({
          search_result: res.data.data,
        })
      }
    })
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