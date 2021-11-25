// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }
  },
  globalData:{
    colorList:['#5470c5','#90cc75','#fac858','#ee6665','#73c0de','#3ba272','#fc8452','#9a60b4'],
    tabbar:[
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "selectedIconPath": "../../static/images/tabbarIcon/shouye.png",
        "iconPath": "../../static/images/tabbarIcon/shouye1.png"
      },
      {
        "pagePath": "/pages/statistics/statistics",
        "text": "统计",
        "selectedIconPath": "../../static/images/tabbarIcon/shijian.png",
        "iconPath": "../../static/images/tabbarIcon/shijian1.png"
      },
      {
        "pagePath": "/pages/record/record",
        "text": "记账",
        "selectedIconPath": "../../static/images/tabbarIcon/zengjia.png",
        "iconPath": "../../static/images/tabbarIcon/zengjia1.png"
      },
      {
        "pagePath": "/pages/bill/bill",
        "text": "流水",
        "selectedIconPath": "../../static/images/tabbarIcon/shuju.png",
        "iconPath": "../../static/images/tabbarIcon/shuju1.png"
      },
      {
        "pagePath": "/pages/my/my",
        "text": "我的",
        "selectedIconPath": "../../static/images/tabbarIcon/huiyuan.png",
        "iconPath": "../../static/images/tabbarIcon/huiyuan1.png"
      }
    ]
  }
});
