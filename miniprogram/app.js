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
    // wx.cloud.callFunction({
    //   name:'login',
    //   data:{},
    //   success:res => {
    //     console.log(res)
    //     this.globalData.openid = res.result.openid
    //   }
    // })
  },
  globalData:{
    listInfo:[
      {"_id":"381d149061a98adf00303d0d08954fd6","openid":"oLb-a5D0lNY5YD_oNtpQxEzdr9wc","appid":"wxc081a514564300dd","category":"naichaxiaochi","price":"9855.60","payType":0,"billType":0,"year":"2021","month":"12","day":"03","timeSort":"202112","createrTime":"11:11","weekTime":"","remark":"","timestamp":1638460800},
{"_id":"c462c81061a98b1c0029acaa7b2790b2","openid":"oLb-a5D0lNY5YD_oNtpQxEzdr9wc","appid":"wxc081a514564300dd","category":"yiyaobaojian","price":"586.00","payType":"1","billType":"1","year":"2021","month":"12","day":"03","timeSort":"202112","createrTime":"11:12","weekTime":"","remark":"","timestamp":1638460800},
{"_id":"381d149061a98b92003071b5044d95b6","openid":"oLb-a5D0lNY5YD_oNtpQxEzdr9wc","appid":"wxc081a514564300dd","category":"naichaxiaochi","price":"88.22","payType":0,"billType":0,"year":"2021","month":"12","day":"02","timeSort":"202112","createrTime":"11:14","weekTime":"","remark":"","timestamp":1606878840},
{"_id":"381d149061a98ba10030778e3bc880af","openid":"oLb-a5D0lNY5YD_oNtpQxEzdr9wc","appid":"wxc081a514564300dd","category":"wucan","price":"8001.00","payType":"1","billType":0,"year":"2021","month":"11","day":"02","timeSort":"202111","createrTime":"11:14","weekTime":"","remark":"","timestamp":1635822840},
{"_id":"381d149061a98bac00307b431a419121","openid":"oLb-a5D0lNY5YD_oNtpQxEzdr9wc","appid":"wxc081a514564300dd","category":"riyongpin","price":"11.00","payType":"1","billType":0,"year":"2021","month":"09","day":"02","timeSort":"202109","createrTime":"11:14","weekTime":"","remark":"","timestamp":1630552440},
{"_id":"381d149061a98bcf00307f9e17e42627","openid":"oLb-a5D0lNY5YD_oNtpQxEzdr9wc","appid":"wxc081a514564300dd","category":"naichaxiaochi","price":"963000.00","payType":"1","billType":0,"year":"2020","month":"12","day":"02","timeSort":"202012","createrTime":"11:14","weekTime":"","remark":"","timestamp":1606878840},
    ],
    userInfoBillByYear:null,
    userInfoBillByMonth:null,
    userInfoBillByDay:null,
    openid:'oLb-a5D0lNY5YD_oNtpQxEzdr9wc',
    iconTenList:[
      { type:'zaocan', name:'早餐'},
      { type:'wucan', name:'午餐'},
      { type:'wancan', name:'晚餐'},
      { type:'tongchengwaimai', name:'外卖'},
      { type:'shuiguo', name:'水果'},
      { type:'riyongpin', name:'日用品'},
      { type:'yiyaobaojian', name:'医药保健'},
      { type:'naichaxiaochi', name:'零食小吃'},
      { type:'huluobushucaiqu', name:'健康蔬菜'}
    ],
    iconMoreList:[
      {
        name:'常用',
        type:'common',
        children:[
          { type:'zaocan', name:'早餐'},
          { type:'wucan', name:'午餐'},
          { type:'wancan', name:'晚餐'},
          { type:'tongchengwaimai', name:'外卖'},
          { type:'shuiguo', name:'水果'},
          { type:'riyongpin', name:'日用品'},
          { type:'yiyaobaojian', name:'医药保健'},
          { type:'naichaxiaochi', name:'零食小吃'},
          { type:'huluobushucaiqu', name:'健康蔬菜'}
        ]
      },
      {
        name:'娱乐',
        type:'recreation',
        children:[
          { type:'xiangyan', name:'香烟'},
          { type:'shouji', name:'数码手机'},
          { type:'changge', name:'娱乐唱歌'},
          { type:'tushuyinxiang', name:'图书音像'},
          { type:'jingdian', name:'景点门票'},
          { type:'zhusu', name:'酒店住宿'},
          { type:'chongwutiandi', name:'宠物用品'},
          { type:'zhenghunjiaoyou', name:'约会纪念'},
        ]
      },
      {
        name:'交通',
        type:'traffic',
        children:[
          { type:'huochepiao', name:'火车票'},
          { type:'huoche', name:'公交出行'},
          { type:'feiji', name:'飞机出行'},  
          { type:'qichepeijian', name:'汽车配件'},
        ]
      },
      {
        name:'购物',
        type:'shopping',
        children:[
          { type:'nvzhuangneiyi', name:'女装服饰'},
          { type:'naipingyingyoueryongpin', name:'婴儿用品'},
          { type:'duogouwu', name:'商城购物'},
          { type:'nvxie', name:'精美女鞋'},
          { type:'huwaiyundong', name:'户外运动'},
          { type:'hunshasheying', name:'婚纱摄影'},
        ]
      },
      {
        name:'餐饮',
        type:'recreation',
        children:[
          { type:'tongchengwaimai', name:'外卖'},
          { type:'shuiguo', name:'水果'},
          { type:'canting', name:'餐厅吃饭'},
          { type:'naichaxiaochi', name:'零食小吃'},
          { type:'huluobushucaiqu', name:'健康蔬菜'},
        ]
      },
      {
        name:'居家',
        type:'home',
        children:[
          { type:'chufangyongpin', name:'厨房用品'},
          { type:'jiajujiancai', name:'家具建材'},
          { type:'jiayongdianqi', name:'家用电器'},
          { type:'jiafangjiashi', name:'家纺家饰'},
          { type:'jiazhengfuwu-07', name:'保洁家政'},
        ]
      },
      {
        name:'护肤',
        type:'skin',
        children:[
          { type:'huazhuangpin', name:'化妆品'},
          { type:'lirenmeirong', name:'美容护肤'},
          { type:'xishuyongpin', name:'洗漱用品'},
        ]
      },
      {
        name:'投资',
        type:'home',
        children:[
          { type:'dixiaofei', name:'基金储蓄'},
          { type:'zhubaoshipin', name:'珠宝饰品'},
        ]
      }, 
    ],
    colorList:['#5470c5','#90cc75','#fac858','#ee6665','#73c0de','#3ba272','#fc8452','#9a60b4'],//颜色立标
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
