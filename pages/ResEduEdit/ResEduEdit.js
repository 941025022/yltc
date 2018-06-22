// pages/ResWorkEdit/ResWorkEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['学历','专业证书', '初中', '高中', '专科', '本科', '硕士', '博士', '简历-教育履历'],
    right: '0',
    top: '0',
    date: '入学时间',
    date2: '毕业时间',
    height: 'auto',
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          height: res.windowHeight
        })
      }

    })

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  chongying: function () {
    this.setData({
      right: '1.7px',
      top: '1.8px',
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },
})