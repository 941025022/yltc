// pages/JobDetail/JobDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    labelData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getDetail(options.id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getDetail: function (id) {
    let that = this
    wx.request({
      url: app.globalData.apiUrl + 'api/JobDetail', //url
      data: {
        id: id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          detailData: res.data.Data.compJobView,
          compData: res.data.Data,
          labelData: res.data.Data.compJobView.compInfo.compInfoLight.split('+')
        });
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
  // 跳转到公司详情页
  goDetail: function (e) {
    wx.navigateTo({
      url: '../compDetail/compDetail?data=' + JSON.stringify(this.data.compData)
    })
  },
  phoneHideShow: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  onReady: function () {
  
  },
})