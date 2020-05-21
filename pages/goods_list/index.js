// pages/category/index.js
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs:[
        {
          id:0,
          value:"综合",
          isActive:true
        },
        {
          id:1,
          value:"销量",
          isActive:false
        },
        {
          id:2,
          value:"价格",
          isActive:false
        }
      ],

      goods_list:[]
  },

  params: {
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totaPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cid;
    console.log(options);
    this.getGoodsList();
  },

  // 滚动条触底 上拉加载更多页
  onReachBottom() {
    
    if (this.params.pagenum>=this.totaPages) { 
      wx.showToast({
        title: '\n没有更多了\n',
        icon: 'none',
        duration: 1500,
      });
      
    }else{
      this.params.pagenum++;
      this.getGoodsList();
    }
  },

  //下拉刷新
  onPullDownRefresh(){
    this.setData({
      goods_list:[]
    })
    this.params.pagenum = 1;
    this.getGoodsList()
  },

  //标题点击事件索引
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  getGoodsList() {
    request({url:"goods/search"},this.params)
    .then(result=>{
      const total = result.data.message.total;
      this.totaPages = Math.ceil(total/this.params.pagesize);
      
      this.setData({
        goods_list : [...this.data.goods_list,...result.data.message.goods]
      })

      wx.stopPullDownRefresh();
    })
    
   
  }  

})