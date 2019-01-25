const csv=require('csvtojson');
const _=require('underscore');
const moment=require('moment');

csv()
.fromFile('./genmdata.csv')
.then((data)=>{
    console.log("User who paid the most money: ",_.max(data, function(user) {
      let num = Number(user.paid.replace("$", ""))
      return num
    }))
  })

console.log("----------------------------------------------------------------------")

csv()
.fromFile('./genmdata.csv')
.then((data)=>{
      let usersFound = 0;
      let sum = 0;
      let average;
    _.map(data, function(user) {
      if(user.apprentices >= 3){
        usersFound += 1;
        sum += Number(user.paid.replace("$",""))
      }
      average = Math.round((sum/usersFound)*100)/100
  })
  console.log("----------------------------------------------------------------------")
  console.log(`Average payment for users with 3 or greater apprentices : $${average}`)
});


csv()
.fromFile('./genmdata.csv')
.then((data)=>{
  let numberOfUsers = 0;
    _.map(data, function(user){
    let arrOfDates = moment(user.created_at*1000).format("MMM Do YY").split(" ")
      if(arrOfDates.indexOf("Jan") != -1 || arrOfDates.indexOf("Feb") != -1
    || arrOfDates.indexOf("Mar") != -1 || arrOfDates.indexOf("Apr") != -1){
      numberOfUsers += 1
    }
  })
  console.log("----------------------------------------------------------------------")
  return console.log(`Users signed up in Q1 2018 : ${numberOfUsers}`);
});


csv()
.fromFile('./genmdata.csv')
.then((data)=>{
  console.log("----------------------------------------------------------------------")
  let users = 0
  _.map(data, function(user){
  let paymentDate = moment(user.paid_at*1000).format('l').split("/")
  let userSignUpDate = moment(user.created_at*1000).format("l").split("/")
    if(_.contains(paymentDate, "2019")){
      if(_.contains(userSignUpDate, "2017")){
        return users += 1;
      }
    }
  })
console.log(`Payments were made in 2019 with users who have signed up in 2017 : ${users}`);
})



csv()
.fromFile('./genmdata.csv')
.then((data)=>{
  console.log("----------------------------------------------------------------------")
  let obj = {}
  let arr = []
  _.map(data, function(user){
    if(!_.contains(arr, user.candidates)){
      arr = [...arr,user.candidates]
    }
    if(_.contains(arr,user.candidates)){
      if(obj[user.candidates] === undefined){
        obj[user.candidates] = +1
      } else {
        obj[user.candidates] += 1
      }
    }
  })
   console.log(`Users have certain amounts of candidates: `);
  _.each(obj, function(user, index){
    console.log(`${user} users have ${index} candidates`)
  })
  console.log("----------------------------------------------------------------------")
})





