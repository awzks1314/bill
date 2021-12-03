const app = getApp()
const util = require('../../utils/tool.js')
import * as echarts from '../../components/ec-canvas/echarts';
var option = {

  series: [{
    type: 'gauge',
    itemStyle: {
      color: '#FFF',
      shadowBlur:1,
      shadowOffsetX: 2,
      shadowOffsetY: 2
    },
    axisLine: {
      roundCap: true,
      lineStyle: {
        width:2
      }
    },
    pointer: {
      icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
      length: '75%',
      width: 4,
      offsetCenter: [0, '15%']
    },
    itemStyle: {
      color: '#e99e6c',
    },
    axisTick: {
      splitNumber: 1,
      lineStyle: {
        width: 2,
        color: '#fff'
      }
    },splitLine: {
      show:false,
      length: 2,
      lineStyle: {
        width: 3,
        color: '#fff'
      }
    },
    title: {
      show: false
    },
    axisLabel: {
      distance: 0,
      color: '#fff',
      fontSize: 0
    },
    progress: {
      show: true,
      roundCap: true,
      width: 2
    },
    min: 0,
    max: 100,
    splitNumber: 10,
    detail: {
      fontSize: 12,
      color:"#fff",
      valueAnimation: true,
      formatter: '{value}%',
      offsetCenter: [0, '70%']
    },
    data: [{
      fontSize: 10,
      value: 0
    }]

  }]
};

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  chart.setOption(option, true);

  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:app.globalData.tabbar,
    current:0,//当前选中
    ec: {
      onInit: initChart
    },
    expendStr:'',
    incomeStr:'',
    surplusStr:'',
    budget:36000,//预算
    budgetStr:'36,000',
    residueBudget:'36,000',//剩余预算
    listDay:null,//每日账单
    listMonth:null,//每月账单
    listInfo:[],
    leaveFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.listInfo && app.globalData.listInfo.length > 0) {
      // this.calculate()
    }else {
      // this.getInfo()
    }
  },
  onShow() {
    // console.log(app.globalData.listInfo)
    if (app.globalData.listInfo && app.globalData.listInfo.length > 0) {
      this.calculate()
    }
    
  },
  getInfo() {
    wx.cloud.callFunction({
      name:'inquire'
    }).then(res => {
      console.log(res)
      if (res.result.data && res.result.data.length > 0) {
        app.globalData.listInfo = res.result.data
        this.calculate()
      }
    })
  },
  // 计算方法，按年月日归纳
  calculateMethod(array,type) {
    var map = {},dest = [];
    for(var i = 0; i < array.length; i++){
        var ai = array[i];
        ai.priceStr = util.changeNum(ai.price)
        if(!map[ai[type]]){
            let data = {
              [type]:ai[type],
              year: ai.year,
              month: ai.month,
              expend:0,
              income:0,
              day:ai.day,
              data: [ai]
            }
            if (ai.billType == 0) {
              // 支出
              data.expend += +ai.price
            }else {
              // 支出
              data.income += +ai.price
            }
            dest.push(data);
            map[ai[type]] = ai;
        }else{
            for(var j = 0; j < dest.length; j++){
                var dj = dest[j];
                if(dj[type] == ai[type]){
                    if (ai.billType == 0) {
                      // 支出
                      dj.expend += +ai.price
                    }else {
                      // 支出
                      dj.income += +ai.price
                    }
                    dj.data.push(ai);
                    break;
                }
            }
        }
    }

    dest.forEach(u => {
      u.expendStr = util.changeNum(u.expend)
      u.incomeStr = util.changeNum(u.income)
    })
    return dest
  },
  // 计算方法，按年月归纳
  calculate() {
    
    let listMonth = this.calculateMethod(app.globalData.listInfo,'timeSort')
    let listDay = this.calculateMethod(app.globalData.listInfo,'timestamp')
    app.globalData.userInfoBillByMonth = listMonth
    app.globalData.userInfoBillByDay = listDay
    this.setData({
      listInfo:app.globalData.listInfo
    })
    // 计算当月
    this.calculateMonth()
    this.calculateDay()
  },
  // 计算当日
  calculateDay() {
    let array = app.globalData.userInfoBillByDay
    console.log(array)
    this.setData({
      listDay:array
    })
  },
  // 计算当月信息
  calculateMonth(){
    let time = new Date()
    let nowTime = time.getFullYear() + '' + (time.getMonth() + 1)

    let array = app.globalData.userInfoBillByMonth

    let arr = array.filter(item => item.timeSort == nowTime)[0]
    let money = Math.abs(arr.expend - arr.income)
    this.setData({
      listMonth:arr,
      residueBudget:this.data.budget - arr.expend >0? util.changeNum(this.data.budget - arr.expend):0,
      expendStr:util.changeNum(arr.expend),
      incomeStr:util.changeNum(arr.income),
      surplusStr:util.changeNum(money)
    }, () => {
      option.series[0].data[0].value = (arr.expend/this.data.budget) >= 1? 100:parseInt((arr.expend/this.data.budget)*100)
      this.data.ec.onInit = initChart
      this.setData({
        ec:this.data.ec
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})