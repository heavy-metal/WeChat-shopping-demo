
let ajaxTimes = 0;

export const request = (URL,params) => {
  return new Promise((resolve,reject)=>{
    ajaxTimes++;
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration: 10000,
    });
    //提取公共部分的url，优化
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1/";
    wx.request({
      
      ...URL,
      url: baseUrl+URL.url,
      method: 'GET',
      data: dealParams(params),
      success:(result)=>{
        resolve(result);
      },
      fail: (err)=>{
        reject(err);
        
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes===0){
          wx.hideToast();
        }
      }
    });
   
    
  })
 
};
function dealParams(params) {
  console.log("请求参数:", params)
  return params;
}