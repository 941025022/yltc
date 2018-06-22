// pages/ResBase/ResBase.js
Page({
  
  data:{
    src:"../../images/resBg.png",
    ft:'15px',
    array:['出生年份'],
    index:0,
    array2:['工作年份'],
    index1:0,
    array3:['最高学历','博士','硕士','本科','高职/大专','高中/中专'],
    index2:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
     var array=that.data.array;
     var array2=that.data.array2;
        var myDate = new Date();
        var yearmax = myDate.getFullYear() - 16;
        var yearmax1 = myDate.getFullYear();
        var yearmin = myDate.getFullYear() - 60;
        for (var i = yearmin; i <= yearmax; i++) {
            array.push(i);
        }
        for (var i = yearmin; i <= yearmax1; i++) {
            array2.push(i);
        }
        that.setData({
            array:array.reverse(),
            array2:array2.reverse()
        })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  chongying:function(){
    this.setData({
      ft:'16px',
    })
  },
  choseImg:function(){
    var tthis = this
    wx.chooseImage({
      
  count: 1, // 默认9
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: function(res) {
      var tempFilePaths = res.tempFilePaths
      tthis.setData({
              src:tempFilePaths
            })

    }
  });
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
    bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange3: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    if(e.detail.value.edu==="0"){
      wx.showModal({
        content: '请选择最高学历',
        showCancel:false,
      })
    }
    if(e.detail.value.work<=e.detail.value.birth){
      wx.showModal({
        content: '出生年份不能大于工作年份',
        showCancel:false,
      })
    }
    if(e.detail.value.work==="0"){
      wx.showModal({
        content: '请选择工作年份',
        showCancel:false,
      })
    }
    if(e.detail.value.birth==="0"){
      wx.showModal({
        content: '请选择出生年份',
        showCancel:false,
      })
    }
    if(e.detail.value.radio===""){
      wx.showModal({
        content: '请选择性别',
        showCancel:false,
      })
    }
    // 性别验证
    var nameL=e.detail.value.name.length;
    console.log(nameL);
    if(nameL===0){
     wx.showModal({
      content: '请填写姓名',
      showCancel:false,
    })
    }else if(nameL===1){
      console.log('加先生或者女士')
    }else{
      
    } 
    // 姓名验证
  }
})