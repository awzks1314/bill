const app = getApp()
const util = require('../../utils/tool.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:app.globalData.tabbar,
    current:3,//当前选中
    listInfo:null,
    listYearMonth:[],
    yearIndex:0,
    total:0,
  },

  onShow() {
      this.calculate()
  },
  // 计算方法，按年月归纳
  calculate() {
    
    let listYear = this.calculateMethod(app.globalData.listInfo,'year')
    app.globalData.userInfoBillByYear= listYear
    let data = listYear[this.data.yearIndex]
    this.setData({
      listInfo:data,
      total:util.changeNum(Math.abs(data.expend - data.income))
    })
    this.calculateYearMonth(data.data)
    // 计算当月
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
      u.surplusStr = util.changeNum(Math.abs(u.expend - u.income))
    })
    return dest
  },

  // 计算同年同月
  calculateYearMonth(arr) {
    
    let listYearMonth = this.calculateMethod(arr,'timeSort')
    console.log(listYearMonth)
    this.setData({
      listYearMonth:listYearMonth
    })
  },
  // 查看对应月份下的每日信息
  openDay(e) {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})