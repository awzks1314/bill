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
    iconIndex:0,//当前选中类型
    moreShow:false,//当前展开还是收缩
    animationData:"",
    payType:['微信支付','支付宝支付','银行卡支付','现金'],
    payIndex:0,
    week:'',//星期几
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [date.getFullYear() - 2018, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()],
    choose_year: '',
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
  changeSelect(e) {
    this.setData({
      [e.currentTarget.dataset.name]:e.currentTarget.dataset.index,
    })
    this.data.moreShow && this.openMoreIcon()
  },
  // 交易方式
  bindPickerChange(e) {
    this.setData({
      payIndex:e.detail.value
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
      animation.height("400rpx").opacity(0).step()
      that.setData({
          // 通过export()方法导出数据
          animationData: animation.export(),
          moreShow:false
      })
      // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
      setTimeout(function () {
          animation.height("126rpx").opacity(1).step({ duration: 500 })
          that.setData({
              animationData: animation.export(),
          })
      }, 50)
    }else {
      //用step()完成一个动画， 高度为0，透明度为不可见
      animation.height("126rpx").opacity(1).step()
      // 用setData改变当前动画
      that.setData({
          // 通过export()方法导出数据
          animationData: animation.export(),
          moreShow:true
      })
      // 设置setTimeout来改变高度以及透明度，实现有感觉的展开
      setTimeout(function () {
          animation.height("400rpx").opacity(1).step({ duration: 500 })
          that.setData({
              animationData: animation.export(),
          })
      }, 50)
    }
  },
  // 获取当前时间
  selectNowTime() {
    this.setData({
      multiIndex: [date.getFullYear() - 2018, date.getMonth(), date.getDate() - 1, date.getHours(), date.getMinutes()]
    })    
    this.bindMultiPickerChange()
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
      week:show_day[date.getDay()],
      time:show_day[date.getDay()] + '      ' + year + '/' + month + '/' + day + ' ' + hour + ':' + minute
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})