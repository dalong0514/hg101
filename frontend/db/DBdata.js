//var util = require('../utils/util.js')
const { $Toast } = require('../lib/iview/base/index');
var WxParse = require('../components/wxParse/wxParse.js');

var DBdevice = function() {
  // 构造函数
  // 把设备的 id 传进来
  // this.id = id;
  this.storageKeyName = "homeData";
}

// 对象的原型链
DBdevice.prototype = {
  data: {

  },

  testdata: [],

  // 获取试验 api 数据
  getTestData: function(){
    let testdata;
    wx.request({
      // url: 'http://127.0.0.1:8000/api/likeList',
      url: 'https://www.hg101.vip/api/likeList',
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        // console.log(res.data);
        testdata = res.data;
        // 必须通过存入缓存，数据才能从这个函数出去
        wx.setStorageSync("testData", testdata);
      }),
      fail: (res => {
        $Toast({
          content: '异常错误',
          type: 'error'
        })
      }),
    })
    return wx.getStorageSync("testData");
  },

  // 获取定型设备数据
  getTypeDevicesData: function(){
    let typedevicesdata = wx.getStorageSync("TypeDevicesData");
    if(!typedevicesdata){
      wx.request({
        // url: 'http://127.0.0.1:8000/api/typedevices',
        url: 'https://www.hg101.vip/api/typedevices',
        success: (res => {
          // console.log(res.data);
          typedevicesdata = res.data;
          // 必须通过存入缓存，数据才能从这个函数出去
          wx.setStorageSync("TypeDevicesData", typedevicesdata);
        }),
        fail: (res => {
          $Toast({
            content: '异常错误',
            type: 'error'
          })
        }),
      })
    }
    return wx.getStorageSync("TypeDevicesData");
  },

  // 获取首页信息
  getDeviceData: function() {
    let hdata = {
      banner: [],
      product: [],
      type: [],
    };
    let homedata = wx.getStorageSync("homeData");
    if(!homedata){
      wx.request({
        // url: 'http://127.0.0.1:8000/api/home',
        url: 'https://www.hg101.vip/api/home',
        header: {
          "openid": wx.getStorageSync('open_id'),
        },
        success: (res => {
          console.log(res.data);
          if(res.data.code == 0) {
            hdata.banner = res.data.data.banner;
            hdata.product = res.data.data.product;
            hdata.type = res.data.data.type;
            wx.setStorageSync("homeData", hdata);
          }
        }),
        fail: (res => {
          $Toast({
            content: '异常错误',
            type: 'error'
          })
        }),
      })
    }
    return wx.getStorageSync("homeData");
  },

  // 获取指定的设备详细页面
  getDetailDevice: function(entry_type, id, search_string){
    wx.request({
      url: `https://www.hg101.vip/api/detail?entry_type=${entry_type}&id=${id}&search_string=${search_string}`,
      header: {
        'openid': wx.getStorageSync('open_id')
      },
      success: function(res) {
        console.log(res.data);
        //console.log(res.data.data.detail)
        WxParse.wxParse('intro', 'html', res.data.data.detail, this, 5);
        WxParse.wxParse('model', 'html', res.data.data.information, this, 5);
      }
    })
  },

  // 获取全部设备信息
  getAllDevice: function(){
    let alldata = wx.getStorageSync("AllData")
    if(!alldata){
      wx.request({
        url: 'https://www.hg101.vip/api/screen',
        // url: 'http://127.0.0.1:8000/api/screen',
        header: {
          "openid": wx.getStorageSync('open_id'),
        },
        success: (res => {
          if(res.data.code == 0) {
            // console.log(res.data);
            wx.setStorageSync("AllData", res.data.data);
            this.alltest = res.data.data;
          }
        }),
        fail: (res => {
          $Toast({
            content: '异常错误',
            type: 'error'
          })
        }),
      })
    }
  },

  //获取收藏的设备数据 id 号
  getItemByCollect: function() {
    let collectlist = [];
    let itemData = wx.getStorageSync("AllData");
    if(!itemData){
      this.getAllDevice();
    }
    itemData = wx.getStorageSync("AllData");
    console.log(itemData);
    let len = itemData.length;
    console.log(len);
    // console.log(itemData[1].name);
    for(let item of itemData){
      if (item.is_collect == 0){
        collectlist.push(item.id);
      } 
    }
  },

  //获取物性数据
  getPropertyData: function() {
    let propertyData = [];
    this.getAllDevice();
    let itemData = wx.getStorageSync("AllData");
    for(let item of itemData){
      if (item.describe === "物性数据"){
        propertyData.push(item);
      } 
    }
    // console.log(propertyData.reverse());
    wx.setStorageSync("PropertyData", propertyData.reverse());
  },

  //获取指定 id 号的设备数据
  getItemById: function() {
    var itemData = this.getDeviceData();
    // console.log(itemData);
    var len = itemData.product.length;
    console.log(len);
    for (var i=0;i<len;i++) {
      if (itemData.product[i].id == 6) {
        return {
          // 当前文章在缓存数据库中的序号
          index: i,
          data: itemData.product[i]
        }
      }
    }
  },

  // 获取收藏的数据
  getCollectData: function(){
    let collectdata;
    wx.request({
      url: 'https://www.hg101.vip/api/likeList',
      header: {
        "openid": wx.getStorageSync('open_id'),
      },
      success: (res => {
        // console.log(res.data);
        collectdata = res.data.data.collect;
        // 必须通过存入缓存，数据才能从这个函数出去
        wx.setStorageSync("CollectData", collectdata);
      }),
      fail: (res => {
        $Toast({
          content: '异常错误',
          type: 'error'
        })
      }),
    })
    return wx.getStorageSync("CollectData");
  },

  //更新本地的评论信息、收藏、阅读量
  updateData: function(action, newComment) {
    const itemData = this.getItemById();
    let deviceData = itemData.data;
    console.log(deviceData);
    // 定位到 product 是关键
    let alldeviceData = this.getDeviceData().product;
    console.log(deviceData.is_collect);
    switch (action) {
      case "collect":
        if (deviceData.is_collect == 0) {
          deviceData.is_collect = 1;
          deviceData.collect_count++;
        } else {
          deviceData.is_collect = 0;
          deviceData.collect_count--;
        }
        break;
      case "comment":
        deviceData.comments.push(newComment);
        deviceData.commentNum++;
        break;
      case "reading":
        deviceData.readingNum++;
        break;
      default:
        break;
    }
    alldeviceData[itemData.index] = deviceData;
    // console.log(alldeviceData);
    // console.log(deviceData);
    return deviceData;
  },

  collect: function(id) {
    this.resid = id;
    console.log(this.resid);
    return this.updateData('collect');
  }

};

module.exports = {
  DBdevice: DBdevice
};