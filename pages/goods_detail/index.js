import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_objc:{}
  },

  goods_info:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id)
  },

  getGoodsDetail(goods_id){
    request({url:"goods/detail"},{goods_id:goods_id})
    .then(result=>{
      const goods_objc = result.data.message
      this.goods_info = goods_objc
      this.setData({
        goods_objc:{
          goods_introduce:goods_objc.goods_introduce.replace(/\.webp/g,'.jpg'),
          goods_price:goods_objc.goods_price,
          goods_name:goods_objc.goods_name,
          pics:goods_objc.pics
        }
      })    

    })
  },

  //点击轮播图
  swiperTap(e){
    const urls = this.goods_info.pics.map(v=>v.pics_mid)//构造新数组
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: urls,
    });
  },
  //加入购物车
  handleAddCart(){
    let cart = wx.getStorageSync("cart") || [];
    //判断商品是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id===this.goods_info.goods_id)
    if (index===-1) {
      this.goods_info.num=1;
      this.goods_info.selected=true;
      cart.push(this.goods_info)
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart",cart)
    wx.showToast({
      title: '已成功加入购物车',
      icon: 'success', 
      mask: true,
    });
  },
  gotocart(){//跳转到购物车页面
   
    wx.reLaunch({
      url: '/pages/cart/index',
     
    });
   
  }
})