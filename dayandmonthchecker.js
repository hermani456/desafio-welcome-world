const date = new Date()
const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()]

const daysAndMonthsChecker = () =>{
   if (month < 10 && day < 10) {
      return (`0${day}-0${month}-${year}`)
   } else {
      return (`${day}-${month}-${year}`)
   }
}
module.exports = daysAndMonthsChecker