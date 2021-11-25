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
        color: '#e49c68',
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
        value: 62
      }]

    }]
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
    current:0,//当前选中
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})