// pages/compDetail/compDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compData: {},
    jobData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let compDa = JSON.parse(options.data)
    let dataFor = compDa.compJobList
    for (var i = 0; i <= dataFor.length - 1; i++) {
      // 将时间格式化
      dataFor[i].updateTime = that.dateJsonStringHours(dataFor[i].updateTime)
    }
    that.setData({
      compData: compDa.compJobView.compInfo,
      jobData: dataFor
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  openJobDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../JobDetail/JobDetail?id=' + e.currentTarget.dataset.id
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  dateJsonStringHours: function (val) {
    return this.dateJsonStringHoursee(val);
  },
  dateJsonStringHoursee: function (val) {
    if (val != null) {
      var date = new Date(val.toString());
      var dateNow = new Date();
      var dateDiff = dateNow.getTime() - date.getTime();
      var hours = Math.floor(dateDiff / (3600 * 1000));
      if (hours < 1)
        hours = 1;
      if (hours < 13)
        return hours + "小时前";
      if (dateNow.toDateString() === date.toDateString())
        return "今天";
      dateNow.setDate(dateNow.getDate() - 1);
      if (dateNow.toDateString() === date.toDateString())
        return "昨天";
      dateNow = new Date();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      if (dateNow.getFullYear == date.getFullYear) {
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return month + "-" + currentDate;
      }
      return dateNow.getFullYear + "-" + month;
    }
    return "";
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})