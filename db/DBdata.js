//var util = require('../utils/util.js')
const { $Toast } = require('../lib/iview/base/index');

var DBdevice = function() {
  // 本地缓存存储键值，相当于构造函数
  // 把设备的 id 传进来
  // this.id = id;
  this.storageKeyName = "homeData";
}

// 操作本地数据缓存的 API
DBdevice.prototype = {
  // 得到全部文章信息
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

  getDeviceData:function() {
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      wx.request({
        url: 'https://www.hg101.vip/api/home',
        header: {
          "openid": wx.getStorageSync('open_id'),
        },
        success: (res => {
          console.log(res.data);
          if(res.data.code == 0) {
            this.data.banner = res.data.data.banner;
            this.data.product = res.data.data.product;
            this.data.type = res.data.data.type;
            // 本地缓存，保存/更新
            wx.clearStorageSync();
            wx.setStorageSync(this.storageKeyName, this.data);
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
    res = wx.getStorageSync(this.storageKeyName);
    return res;
  },

  // 本地缓存，保存/更新
  execSetStorageSync: function(data) {
    // 书里是 get 更改为 set，但发现 get 也能存入数据，疑问
    wx.setStorageSync(this.storageKeyName, data);
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