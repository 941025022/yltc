// pages/JobList/JobList.js
var moneyData = require('../../utils/money.js');
const app = getApp()
Page({
  data:{
    zhiwei:'职位',
    zxzwShow:false,
    a:"aOn",
    // 列表数据
    listData:[],
    pageSize: 10,  //每页数量
    pageNum:1, //页码
    scrollheight:'',
    area:'城市',
    jobType: '职位',
    firstJobTypeData: [],
    secondJobTypeData: [],
    sstcopen:false,
    qyopen:false,
    isfull:false,
    value: '',
    // 城市数据
    cityleft: [],
    citycenter: {},
    cityright: {},
    select1: '',
    select2:'',
    select3: '',
    firstTypeIndex: '',
    secondTypeIndex: '',
    //以上为选择地址
    moneyMin:'月',
    moneyMax:'薪',
    yxopen:false,
    lxopen: false,
    moneyleft: moneyData.getMoney(),
    // 搜索条件
    bean: '',
    // 关键词搜索
    keyWord: '',
    searchType: 1,
    // 常用搜索
    xiaoshou:'销售',
    kuaiji: '会计',
    wenyuan: '文员',
    renshi: '人事',
    chuna: '出纳'
  },
  onLoad:function(options){
    var that = this;
    that.setData({
      bean: {
        'page': that.data.pageNum,
        'pageSize': that.data.pageSize
      }
    })
    // 加载列表数据
    that.loadData(that.data.bean)
    // wx.getUserInfo({
    //   success: function (res) {
    //     that.setCity(res.userInfo.city)
    //   }
    // })
    // 页面初始化 options为页面跳转所带来的参数
    wx.getSystemInfo({
      success: function(res) {
        var h=res.windowHeight-98;
        that.setData({
          scrollheight:h+"px",
        })
      }
    })
  },
  setCity: function (name) {
    let that = this
    wx.request({
      url: app.globalData.apiUrl + 'api/CityCode', //url
      data: {
        cityName: name
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          area: res.data.Data.name,
          select3: res.data.Data.name,
          bean: {
            'page': that.data.pageNum,
            'pageSize': that.data.pageSize,
            'cityCode': res.data.Data.code
          }
        })
        // 加载列表数据
        that.loadData(that.data.bean)
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
  // 跳到搜索框
  tiao:function(e){
    this.setData({
      zxzwShow:true
    })
  },
  // 搜索框那边选择职位公司
  tcshow:function(){
    if (this.data.sstcopen) {
      this.setData({
        sstcopen: false,
      })
    } else {
      this.setData({
        sstcopen: true,
      })
    }
  },
  // 选择了职位
  zhiwei:function(e){
    this.setData({
      zhiwei:'职位',
      sstcopen: false,
      searchType: 1
    })
  },
  // 选择了公司
  gongsi: function (e) {
    this.setData({
      zhiwei: '公司',
      sstcopen: false,
      searchType: 2
    })
  },
  // 返回首页列表
  returnsj:function(){
    console.log('1')
    this.setData({
     zxzwShow:false
    })
  },
  // 地址选择js控制显示隐藏
  listqy: function(e){
    if(this.data.qyopen){
      this.setData({
        qyopen:false,
        isfull:false,
      })
    }else{
      this.selectleft()
      this.setData({
        qyopen:true,
        isfull:true,
        yxopen:false,
        lxopen: false
      })
    }
  },
  // 加载第一列职位类型
  loadFirstType: function (e) {
    let that = this
    wx.request({
      url: app.globalData.apiUrl + 'api/Occupations', //url
      data: {
        code: 0
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.Data.length !== 0) {
          that.setData({
            firstJobTypeData: res.data.Data
          })
        }
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
  //点击地址第一列加载第二列职位
  clickFirstType: function (e) {
    let that = this
    that.setData({
      firstTypeIndex: e.target.dataset.index,
    })
    if (e.target.dataset.name === '不限') {
      this.setData({
        jobType: '职位',
        lxopen: false,
        isfull: false,
        listData: []
      });
      this.data.bean.occupationCode = e.target.dataset.code
      // 加载列表数据
      this.data.bean.page = 1
      this.loadData(this.data.bean)
    }
    wx.request({
      url: app.globalData.apiUrl + '/api/Occupations', //url
      data: {
        code: e.target.dataset.code
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          secondJobTypeData: res.data.Data
        })
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
  // 点击职位类型第二列筛选
  clickSecondType: function (e) {
    this.setData({
      jobType: e.target.dataset.name,
      lxopen: false,
      isfull: false,
      listData: []
    });
    if (this.data.jobType === '不限') {
      this.setData({
        jobType: this.data.firstJobTypeData[this.data.firstTypeIndex].name
      });
    } else if (this.data.firstJobTypeData[this.data.firstTypeIndex].name !== '不限' && this.data.jobType === '不限') {
      this.setData({
        jobType: this.data.firstJobTypeData[this.data.firstTypeIndex].name
      });
    }
    this.data.bean.occupationCode = e.target.dataset.code
    // 加载列表数据
    this.data.bean.page = 1
    this.loadData(this.data.bean)
  },
  // 选择左侧城市
  selectleft: function(e){
    let that=this
    wx.request({
      url: app.globalData.apiUrl + 'api/ProvinceCity', //url
      data: {
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let data=[]
        for (var i = 0; i <= res.data.Data.length - 1; i++) {
          // shiData = that.data.cityleft.concat(res.data.Data[i].citys)
          for (var j = 0; j <= res.data.Data[i].citys.length - 1; j++) {
            data.push(res.data.Data[i].citys[j])
          }
        }
        that.setData({
          citycenter: data
        })
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
  //点击地址第一列触发事件
  selectleft1: function(e){
    this.setData({
      select1: e.target.dataset.index,
    })
    let that = this
    wx.request({
      url: app.globalData.apiUrl + '/api/Addr', //url
      data: {
        code: e.target.dataset.code
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          citycenter: res.data.Data
        })
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
// 选择中间城市
  selectcenter: function(e){
    console.log(e)
    this.setData({
      select2: e.target.dataset.index,
      select3: e.target.dataset.name,
    })
    let that = this
    wx.request({
      url: app.globalData.apiUrl + '/api/Addr', //url
      data: {
        code: e.target.dataset.code
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          cityright: res.data.Data
        })
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
// 选择右侧城市
  selectright: function(e){
    console.log(e)
    this.setData({
      area:e.target.dataset.name,
      qyopen:false,
      isfull:false,
      listData: []
    });
    if (e.target.dataset.name === '不限') {
      this.setData({
        area: this.data.citycenter[this.data.select2].name,
      });
    }
    this.data.bean.cityCode=e.target.dataset.value
    // 加载列表数据
    this.data.bean.page = 1
    this.loadData(this.data.bean)
  },
  // 职位类型选择
  listlx: function (e) {
    if (this.data.lxopen) {
      this.setData({
        lxopen: false,
        isfull: false,
      })
    } else {
      this.loadFirstType()
      this.setData({
        lxopen: true,
        isfull: true,
        qyopen: false,
        yxopen: false
      })
    }
  },
  // 月薪选择
  listyx: function(e){
    if(this.data.yxopen){
      this.setData({
        yxopen:false,
        isfull:false,
      })
    }else{
      this.setData({
        yxopen:true,
        isfull:true,
        qyopen:false,
        lxopen:false
      })
    }
  },
  // 选择最小月薪
  selectleftMin: function(e){
    console.log(e)
    this.setData({
      select1: e.target.dataset.money,
      moneyMin: this.data.moneyleft[e.currentTarget.dataset.money].num+"-",
      moneyright:this.data.moneyleft[e.currentTarget.dataset.money].arr,
    });
    this.data.bean.startSalary = this.data.moneyleft[e.currentTarget.dataset.money].num.replace('K', '000')
    if (this.data.moneyleft[e.currentTarget.dataset.money].num === '不限') {
      this.setData({
        moneyMin: '月',
        moneyMax: '薪',
        yxopen: false,
        isfull: false,
        listData: []
      });
      this.data.bean.page = 1
      this.loadData(this.data.bean)
    }
  },
  // 选择最大月薪
  selectrightMax: function(e){
    this.setData({
      select2: e.target.dataset.item,
      moneyMax:e.target.dataset.item,
      yxopen:false,
      isfull:false,
      listData: []
    });
    this.data.bean.endSalary = e.target.dataset.item.replace('K', '000')
    this.data.bean.page = 1
    this.loadData(this.data.bean)
  },
  // 点击遮罩层隐藏所有弹窗
  hidebg: function(e){
     this.setData({
      qyopen:false,
      yxopen:false,
      isfull:false,
      lxopen: false
    })
  },
  // 滚动到底部加载数据
  scrollLoading: function () { //滚动加载
    this.data.bean.page ++
    this.loadData(this.data.bean)
  },
  // 打开职位详情页
  openJobDetail: function (e) {
    wx.navigateTo({
      url: '../JobDetail/JobDetail?id=' + e.currentTarget.dataset.id
    });
  },
  // 加载列表数据
  loadData: function (bean) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    wx.request({
      url: app.globalData.apiUrl + 'api/JobList', //url
      data: bean,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.Data.length === 0) {
          // 关闭加载中
          wx.hideLoading()
          wx.showToast({
            title: '暂无新数据',
            icon: 'none',
            duration: 2000
          })
        } else {
          let dataFor = res.data.Data
          for (var i = 0; i <= dataFor.length - 1; i++) {
            // 将地址格式化
            dataFor[i].occupationTypeName = dataFor[i].occupationTypeName.split('-')[1] + '-' + dataFor[i].occupationTypeName.split('-')[2]
            // 将时间格式化
            dataFor[i].jobLogtime = that.dateJsonStringHours(dataFor[i].jobLogtime)
            if (dataFor[i].startSalary !== 0) {
              dataFor[i].startSalary = String(dataFor[i].startSalary).replace('000', 'K')
              dataFor[i].endSalary = String(dataFor[i].endSalary).replace('000', 'K')
            }
          }
          that.setData({
            listData: that.data.listData.concat(dataFor)
          });
          console.log(that.data.listData)
          // 关闭加载中
          wx.hideLoading()
        }
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
  // 获取搜索的关键字
  getkeyWord: function (event) {
    this.setData({
      keyWord: event.detail.value
    })
  },
  // 点击搜索按钮触发加载列表
  searchJob: function (event) {
    this.setData({
      zxzwShow: false,
      listData: []
    })
    this.loadKeyWord()
  },
  // 关键词搜索接口
  loadKeyWord: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    that.setData({
      jobType: '职位'
    })
    wx.request({
      url: app.globalData.apiUrl + 'api/SearchJobs', //url
      data: {
        'keyWord': that.data.keyWord,
        'type': that.data.searchType,
        'page': 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.Data.length)
        if (res.data.Data.length === 0) {
          // 关闭加载中
          wx.hideLoading()
          wx.showToast({
            title: '暂无新数据',
            icon: 'none',
            duration: 2000
          })
        } else {
          let dataFor = res.data.Data
          for (var i = 0; i <= dataFor.length - 1; i++) {
            // 将地址格式化
            dataFor[i].occupationTypeName = dataFor[i].occupationTypeName.split('-')[1] + '-' + dataFor[i].occupationTypeName.split('-')[2]
            // 将时间格式化
            dataFor[i].jobLogtime = that.dateJsonStringHours(dataFor[i].jobLogtime)
          }
          let arr = that.data.listData.concat(dataFor)
          that.setData({
            listData: arr
          });
          // 关闭加载中
          wx.hideLoading()
        }
      },
      fail: function (res) {
        console.log(res.message)
      }
    })
  },
  search: function (e) {
    this.setData({
      keyWord: e.target.dataset.word,
      zxzwShow: false,
      listData: [],
      value: e.target.dataset.word
    })
    this.loadKeyWord()
  },
  dateJsonStringHours: function(val){
    return this.dateJsonStringHoursee(val);
  },
  dateJsonStringHoursee: function(val) {
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
  }
})