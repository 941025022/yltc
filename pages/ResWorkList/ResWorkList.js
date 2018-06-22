// pages/RecJobToResLog/RecJobToResLog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        name: "我的",
      },
      {
        name: "我的",
      },
      {
        name: "我的啊",
      }
    ],
    flag: false,
  },
  lidelete: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.items;
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
      items: list
    });
  },
  delShow: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index;

    if (this.data.flag) {
      this.setData({
      })
    } else {
      this.setData({
      })
    }
  }

})