// pages/ResWorkEdit/ResWorkEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: '0',
    top: '0',
    date: '入职时间',
    date2: '离职时间',
    view1:'block',
    view2:'none',
    view3: 'none',
    height:'auto',
    items:[
      {
        userId: 1,
        name: "user1",
      },
      {
        userId: 2,
        name: "user2",
      },
      {
        userId: 3,
        name: "user3",
      }
    ],
    works:[
      {
        userId: 1,
        work: "user1",
      },
      {
        userId: 2,
        work: "user2",
      },
      {
        userId: 3,
        work: "user3",
      }
    ],
    userCellId:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
         console.log(res.windowHeight)
         that.setData({
           height: res.windowHeight
         })
      }
     
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
  go2:function(){
    this.setData({
      view1:'none',
      view2: 'block',
      view3: 'none',
    })
  },
  go3: function () {
    this.setData({
      view1: 'none',
      view2: 'none',
      view3: 'block',
    })
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
  userListAction: function (e) {
    console.log(e)
    console.log(`点击了${e.target.dataset.idx}`)
    this.setData({
      userCellId: e.target.dataset.idx
    })
  }
})