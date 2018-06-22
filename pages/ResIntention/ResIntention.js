var moneyData = require('../../utils/money.js');
Page({
  data: {
    //以上为选择地址
    moneyMin: '月',
    moneyMax: '薪',
    yxopen: false,
    view1: 'block',
    view2: 'none',
    view3: 'none',
    view4: 'none',
    height: 'auto',
    zIndex:0,
    moneyleft: moneyData.getMoney(),
    array: ['求职状态','离职-随时到岗','在职-暂不考虑', '在职-考虑机会', '在职-月内到岗'],
    index: 0,
    items: [
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
    works: [
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
    hyyx:[
      { 
      name: "我啊的啊1",
      claass:"" ,
      },
      {
        name: "我啊的啊2",
        claass: "",
      },
      {
        name: "我啊的啊3",
        claass: "",
      },
      {
        name: "我啊的啊4",
        claass: "btn-sel-on",
      },
      {
        name: "我啊的啊5",
        claass: "",
      },
      {
        name: "我啊的啊6",
        claass: "",
      },
      {
        name: "我啊的啊7",
        claass: "",
      },
     
    ],
    userCellId: '0'
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
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
  addColor:function(e){
      console.log(e)
      var list = this.data.hyyx;
      console.log(list);
      console.log(this);
      this.setData({
        claass:'btn-sel-on',
        name:'www'
      })
  },
  listyx: function (e) {
    if (this.data.yxopen) {
      this.setData({
        yxopen: false,
        isfull: false,
        zIndex:0,
      })
    } else {
      this.setData({
        yxopen: true,
        isfull: true,
        qyopen: false,
        zIndex: 1,
      })
    }

  },
  selectleftMin: function (e) {
    this.setData({
      moneyMin: e.target.dataset.money + "-",
      moneyright: this.data.moneyleft[e.currentTarget.dataset.money],
    });
  },
  selectrightMax: function (e) {
    this.setData({
      moneyMax: e.target.dataset.item,
      yxopen: false,
      isfull: false
    });
    console.log(e.target.dataset.item)
  },
  hidebg: function (e) {
    this.setData({
      qyopen: false,
      yxopen: false,
      isfull: false,
    })
  },
  go2: function () {
    console.log('2')
    this.setData({
      view1: 'none',
      view2: 'block',
      view3: 'none',
      view4: 'none',
    })
  },
  go3: function () {
    this.setData({
      view1: 'none',
      view2: 'none',
      view3: 'block',
      view4: 'none',
    })
  },
  go4: function () {
    this.setData({
      view1: 'none',
      view2: 'none',
      view3: 'none',
      view4:'block',
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