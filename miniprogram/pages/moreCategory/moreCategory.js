const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconIndex:0,
    iconList:app.globalData.iconMoreList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeIconIndex(e) {
    let index = e.currentTarget.dataset.index
    if (index != this.data.iconIndex) {
      this.setData({
        iconIndex:index
      })
    }
  },
  changeCommon(e) {
    let dat = e.currentTarget.dataset
    let arr = app.globalData.iconTenList.slice(0,8)
    arr.unshift({
      type:dat.type,
      name:dat.name
    })
    app.globalData.iconTenList = arr
    console.log(arr)
    wx.navigateBack({
      delta: 0
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})