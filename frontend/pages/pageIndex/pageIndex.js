// pages/pageIndex/pageIndex.js
const pageManager = require('../../utils/pageManager');
const { fPromise } = require('../../utils/util');

const app = getApp();

const indexPageObj = {
  onload: function () {
    //
  },
  onNavigate: function () {
    const that = this;
    const promiseBooks = fPromise(wx.request) ({
      url: 'api'
    }).then(function (res) {
      return res.data;
    });

    pageManager.putData('getBooks', promiseBooks);
  },

  gotoPageC: function () {
    this.onNavigate();
    const currentTime = +new Date();
    console.log('Navigate to PageC', currentTime);
    app.setNavigateTime(currentTime);
    wx.navigateTo({
      url: '../pageC/index'
    })
  }
}

Page(indexPageObj);