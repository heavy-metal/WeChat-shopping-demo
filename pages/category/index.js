
import {request} from "../../request/index.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList:[],
    leftMenus:[],
    rightMenus:[],
    currentIndex:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
      const Cates = wx.getStorageSync("cates");//取出缓存数据
      if (!Cates) {
        this.getCategoryList();
      }else{
        if (Date.now() - Cates.time > 1000 * 60 * 60 * 24) {//是否超过自己设定的缓存有效时间
          this.getCategoryList();
        }else{
          this.cateList = Cates.data
          let leftMenus = this.cateList.map(v => v.cat_name);
          let rightMenus = this.cateList[0].children;
          this.setData({
            leftMenus,
            rightMenus
          })
        }
      }
      
    
  },

  getCategoryList(){
    request({url:"categories"})
    .then(result=>{
      this.cateList = result.data.message;
      wx.setStorageSync("cates", {time:Date.now(),data:this.cateList});////本地缓存
      let leftMenus = this.cateList.map(v => v.cat_name);
      let rightMenus = this.cateList[0].children;
      this.setData({
        leftMenus,
        rightMenus
      })
    })
    // const res = await request({ url:"categories" });
    // this.cateList = result.data.message;
    // wx.setStorageSync("cates", {time:Date.now(),data:this.cateList});////本地缓存
    // let leftMenus = this.cateList.map(v => v.cat_name);
    // let rightMenus = this.cateList[0].children;
    // this.setData({
    //     leftMenus,
    //     rightMenus
    //   })
  },

  leftItemTap(e) {
    
    const {index} = e.currentTarget.dataset;

    let rightMenus = this.cateList[index].children;

    this.setData({
      currentIndex:index,
      rightMenus,
      scrollTop:0
    })
  }

})