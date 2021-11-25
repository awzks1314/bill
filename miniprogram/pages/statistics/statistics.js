const app = getApp()
import * as echarts from '../../components/ec-canvas/echarts';

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      fontSize:10,
      data: [],
      splitLine: {
        show:false
     },axisLine: {show: false},  
    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '3%',
      top:'19%',
      containLabel: true
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show:false
      }
    },
    series: [
      {
        data: [820, 932, 9010, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        symbol: 'none',  //取消折点圆圈
        lineStyle: {
          width: 0
        },
        areaStyle: {
          color:'#4ea38d'
        }
      }
    ]
  };

  chart.setOption(option, true);

  return chart;
}

function initCharts(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show:false,
      top: '5%',
      left: 'center'
    },
    color:app.globalData.colorList,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        labelLine: {
          show: false
        },
        data: [
          { value: 1048 },
          { value: 735 },
          { value: 580 },
          { value: 484},
          { value: 300}
        ],
        roseType: 'radius',
      }
    ]
  };

  chart.setOption(option, true);

  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:app.globalData.tabbar,
    colorList:app.globalData.colorList,
    current:1,//当前选中
    selectIndex:-1,
    timeIndex:0,
    scrollLeft:0,
    ec: {
      onInit: initChart
    },
    pie: {
      onInit: initCharts
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  changeSelect(e) {
    console.log(e)
    this.setData({
      selectIndex:e.currentTarget.dataset.index
    })
  },
  // 时间选择
  timeSelect(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    if (index != this.data.selectIndex) {
      this.setData({
        timeIndex:e.currentTarget.dataset.index,
        scrollLeft:(index - 2)*54
      })
    }     
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})