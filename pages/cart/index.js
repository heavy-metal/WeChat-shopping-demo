// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allSelected: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {

  },
  
  onShow: function () {
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })
    const cart = wx.getStorageSync("cart")||[];
    //遍历cart每一个子项的selected都为true的时候，allSelected才为true
    // const allSelected =cart.length?cart.every(v=>v.selected):flase;
   this.setCart(cart);
  },

  //商品复选框点击事件
  checkboxItemTap(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].selected = !cart[index].selected;
    
    this.setCart(cart);//重新计算价格
    wx.setStorageSync("cart", cart);
  },

  //点击获取收货地址的按钮
  handleButton(){
    wx.getSetting({
      success: (result)=>{
        //判断用户是否获取了地址权限
        const scopeAddress = result.authSetting["scope.address"]
        if (scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success: (result1)=>{
              //缓存收货地址
              result1.all = result1.provinceName+result1.cityName+result1.countyName+result1.detailInfo
              wx.setStorageSync("address", result1);
            },
          });
        }else{//曾经拒绝过获取用户地址信息，诱导打开设置
          console.log('拒绝过要准备打开设置')
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  console.log('拒绝过')
                  //缓存收货地址
                  result3.all = result3.provinceName+result3.cityName+result3.countyName+result3.detailInfo
                  wx.setStorageSync("address", result3);
                },
              });
            },

          });
        }
      },
    
    });
  },
  //计算 全选，总价格，购买数量
  setCart(cart){
    
    let allSelected = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.selected){
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
      }else{
        allSelected = false;
      }
    });
    //判断数组是否为空
    allSelected = cart.length!=0?allSelected:false;
    this.setData({
      cart,
      allSelected,
      totalPrice,
      totalNum
    })
  },

  //全选的复选框点击事件
  handleAllcheckItem(){
    let {cart,allSelected} = this.data;
    allSelected = !allSelected;
    cart.forEach(v=>v.selected = allSelected);
    this.setCart(cart);
    wx.setStorageSync("cart", cart);
  },

  // + - 商品数量
  handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id === id);

    //删除商品
    if (operation===-1 && cart[index].num===1){
      wx.showModal({
        title: '温馨提示',
        content: '确定要删除此商品？',
        success: (result) => {
          if(result.confirm){
            cart.splice(index,1);
            this.setCart(cart);
            wx.setStorageSync("cart", cart);
          }
        },
      });
    }else{
      cart[index].num += operation;
      this.setCart(cart);
      wx.setStorageSync("cart", cart);
    }

    
    
  },

  //点击结算按钮
  handlePay(){
    let {address,totalNum} = this.data;
    if (!address.userName){
      wx.showToast({
        title: '请填写收货地址',
        icon: 'none',
      })
    }else if (totalNum===0){
      wx.showToast({
        title: '购物车还不存在商品哦',
        icon: 'none',
      })
    }else{
      wx.navigateTo({
        url: '/pages/pay/index',
        success: (result)=>{
          
        },
      });
    }
  }
      
})