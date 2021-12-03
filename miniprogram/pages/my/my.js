const app = getApp()
const util = require('../../utils/tool.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:app.globalData.tabbar,
    current:4,//当前选中
  },

  onShow() {
    this.calculate()
  },
  // 计算方法，按年月归纳
  calculate() {
    console.log(app.globalData.listInfo)
    // 计算当月
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})