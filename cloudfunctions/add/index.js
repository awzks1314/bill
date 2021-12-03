const cloud = require('wx-server-sdk')
cloud.init();

const db = cloud.database();

// 云函数入口函数

exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  try {

    return await db.collection('bill').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        name: event.name,
        category: event.category,
        price: event.price,
        payType: event.payType,
        billType: event.billType,
        year:event.year,
        month:event.month,
        day:event.day,
        timeSort:event.timeSort,
        createrTime:event.createrTime,
        weekTime: event.weekTime,
        remark: event.remark,
        timestamp:event.timestamp
      }
    })
  } catch (e) {
    console.error(e)
  }

}