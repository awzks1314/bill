//去逗号
const changeSym = function changeSym(num) {
  if (typeof num == 'number'){
    num = num.toString()
  }
  return num.split(',').join('')
}
//三位加逗号
const changeNum = function toThousands(num) {
  if (typeof num == 'number'){
    num = num.toFixed(2).toString()
  }
  return num.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
module.exports = {
  changeNum:changeNum,
  changeSym: changeSym
}