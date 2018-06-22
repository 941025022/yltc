// pages/RecJobToResLog/RecJobToResLog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        name: "我的",
        flag: true,
      },
      {
        name: "我的",
        flag: false,
      },
      {
        name: "我的啊",
        flag: false,
      }
    ],
    
  },
  lidelete:function(e){
    var index = e.target.dataset.index;
    var list = this.data.items;
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
    items: list
    });
  },
  delShow:function(e){
    var that=this;
    var index = e.currentTarget.dataset.index; 
    console.log(this.data.items[index].flag);
    console.log(index);
    var val = this.data.items[index].flag;
    if (this.data.items[index].flag=true){
      console.log('11')
      that.setData({
        val:false,
      })
    }else{
      console.log('22')
      that.setData({
        val: true,
      })
    }
  }

})