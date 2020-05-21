//index.js
//获取应用实例
const app = getApp()

import {request} from "../../request/index.js"


Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },

  onLoad: function () {
    
   this.getSwiperList();
   this.getCatesList(); 
   this.getfloorList();
},

//获取轮播图数据
  getSwiperList(){
    request({url:"home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList : result.data.message
      })
    })
  },
  //获取分类导航数据
  getCatesList(){
    request({url:"home/catitems"})
    .then(result=>{
      this.setData({
        catesList : result.data.message
      })
    })
  },
   //获取楼层数据
   getfloorList(){
    request({url:"home/floordata"})
    .then(result=>{
      this.setData({
        floorList : result.data.message
      })
    })
  }

  
})
