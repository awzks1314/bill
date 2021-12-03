

const app = getApp()
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = 2018; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:app.globalData.tabbar,
    current:2,//当前选中
    selectIndex:0,//支付还是支出
    moreShow:false,//当前展开还是收缩
    animationData:"",
    payType:['微信支付','支付宝支付','银行卡支付','现金'],
    payIndex:0,//0支出、收入
    week:'',//星期几
    year:'',
    month:'',
    day:'',
    timestamp:'',
    createrTime:'',
    timeSort:"",
    canRecord:true,
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [date.getFullYear() - 2018, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
    choose_year: '',
    counterShow:false,//金额计算器
    realPrice:'',//最终价格
    tempPrice:'',//缓存价格
    symbolStr:'',//当前运算符号
    priceStr:'',//当前运算数字
    iconIndex:0,//当前选中类型
    iconList:app.globalData.iconTenList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })
  },
  onShow() {
    this.setData({
      iconList:app.globalData.iconTenList
    })
  },
  changeSelect(e) {
    this.setData({
      [e.currentTarget.dataset.name]:e.currentTarget.dataset.index,
    })
    this.data.moreShow && this.openMoreIcon()
  },
  // 跳转
  goToUrl(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
  },
  // 交易方式
  bindPickerChange(e) {
    this.setData({
      payIndex:e.detail.value
    })
  },
  // 打开金额选择
  openCounter() {
    this.setData({
      counterShow: !this.data.counterShow
    })
  },
  // 金额新增
  addPriceStr(e) {
    
    let str = e.currentTarget.dataset.str
    let type = e.currentTarget.dataset.type || 'number'
    if (type == 'number') {
      this.data.tempPrice += str
      this.data.realPrice = (Number(this.data.tempPrice)).toFixed(2)
    }else if (!this.data.symbolStr){
      this.data.symbolStr = str
      this.data.tempPrice += str
    }
    this.setData({
      symbolStr:this.data.symbolStr,
      tempPrice:this.data.tempPrice,
      realPrice:this.data.realPrice,
      priceStr:this.data.realPrice.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    })
  },
  
  // 删除
  clearStr() {
    this.setData({
      symbolStr:'',
      realPrice:'',
      tempPrice:'',
      priceStr:''
    })
  },
  // 动画
  openMoreIcon() {
    // 用that取代this，防止setTimeout内使用this出错
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
        // 动画持续时间
        duration: 500,
        // 定义动画效果，当前是匀速
        timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    if (that.data.moreShow) {
      // 展开式，收缩动画
      animation.height("560rpx").opacity(0).step()
      that.setData({
          // 通过export()方法导出数据
          animationData: animation.export(),
          moreShow:false
      })
      // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
      setTimeout(function () {
          animation.height("280rpx").opacity(1).step({ duration: 500 })
          that.setData({
              animationData: animation.export(),
          })
      }, 50)
    }else {
      //用step()完成一个动画， 高度为0，透明度为不可见
      animation.height("280rpx").opacity(1).step()
      // 用setData改变当前动画
      that.setData({
          // 通过export()方法导出数据
          animationData: animation.export(),
          moreShow:true
      })
      // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
      setTimeout(function () {
          animation.height("560rpx").opacity(1).step({ duration: 500 })
          that.setData({
              animationData: animation.export(),
          })
      }, 50)
    }
  },
  // 获取当前时间
  selectNowTime() {
    let tim = new Date()
    this.setData({
      multiIndex: [tim.getFullYear() - 2018, tim.getMonth(), tim.getDate() - 1, tim.getHours(), tim.getMinutes()]
    }, () => {
      this.bindMultiPickerChange()
    })   
  },
  //获取时间日期
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    if(e && e.detail.value) {
      this.setData({
        multiIndex: e.detail.value
      })
    }
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    this.setData({
      time: year + '/' + month + '/' + day + ' ' + hour + ':' + minute,
      timestamp:year + '/' + month + '/' + day ,
      timeSort:year + '' + month,
      year,
      month,
      day,
      createrTime:hour + ':' + minute
    })
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  // 保存
  save() {
    if (this.data.realPrice <=0 ) {
      wx.showToast({
        title: '请输入金额',
        icon:'error'
      })
      this.openCounter()
      return
    }else if (this.data.year <=0 ) {
      wx.showToast({
        title: '请选择时间',
        icon:'error'
      })
      return
    }
    let data = {
      name:this.data.iconList[this.data.iconIndex].name,
      category: this.data.iconList[this.data.iconIndex].type,
      price: this.data.realPrice,
      payType: this.data.payIndex,
      billType: this.data.selectIndex,
      year:this.data.year,
      month:this.data.month,
      day:this.data.day,
      createrTime:this.data.createrTime,
      timeSort:this.data.timeSort,
      weekTime: this.data.week,
      remark: this.data.remark || '',
      timestamp:(new Date(this.data.timestamp).getTime())/1000
    }
    wx.cloud.callFunction({
      name:'add',
      data,
      success:res => {
        app.globalData.listInfo.push({
          ...data
        })
        wx.navigateBack()
      }
    })
  },
  // 保存
  saveAndAlign() {
    if (this.data.realPrice <=0 ) {
      wx.showToast({
        title: '请输入金额',
        icon:'error'
      })
      this.openCounter()
      return
    }else if (this.data.realPrice <=0 ) {
      wx.showToast({
        title: '请选择时间',
        icon:'error'
      })
      return
    }
    let data = {
      name:this.data.iconList[this.data.iconIndex].name,
      category: this.data.iconList[this.data.iconIndex].type,
      price: this.data.realPrice,
      payType: this.data.payIndex,
      billType: this.data.selectIndex,
      year:this.data.year,
      month:this.data.month,
      day:this.data.day,
      createrTime:this.data.createrTime,
      weekTime: this.data.week,
      timeSort:this.data.timeSort,
      remark: this.data.remark || '',
      timestamp:(new Date(this.data.timestamp).getTime())/1000
    }
    if (this.data.canRecord) {
      var that = this
      wx.cloud.callFunction({
        name:'add',
        data,
        success:res => {
          console.log(res)
          wx.showToast({
            title: '记录成功',
            icon:'success'
          })
          app.globalData.listInfo.push({
            ...data
          })
          that.setData({
            canRecord:false,
            symbolStr:'',
            tempPrice:'',
            realPrice:''
          })
          that.setTime()
        }
      })
    }else {
      wx.showToast({
        title: '操作过于频繁，五秒后重试',
      })
    }
  },
  // 定时器
  setTime() {
    let time = 5
    let dat = setInterval(() => {
      console.log(time)
      if (time > 0) {
        time = time -  1
      }else {
        this.setData({
          canRecord:true
        })
        clearInterval(dat)
      }
    }, 1000);
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})