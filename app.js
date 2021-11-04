
require("dotenv").config()
var express = require('express');
const fetch = require('node-fetch')
var app = express();
const apiRouter = require("./routes/index")
app.use(express.json())
app.use("/api/v1", apiRouter)
const service = require("./services")
var http = require('http');
var iconv = require('iconv-lite');
global.restorants = [];
global.adresses = [];
restorants[0] = "192.168.15.95:3006";
restorants[1] = "192.168.15.166:4000";
restorants[2] = "10.12.0.23:3000";
restorants[3] = "192.168.15.95:3007";
restorants[4] = "10.13.0.20:3000";
restorants[5] = "10.3.0.20:3000";
restorants[6] = "192.168.15.95:3006";
restorants[7] = "10.4.0.20:3000";
restorants[8] = "10.15.0.13:3000";
restorants[9] = "10.18.0.20:3000";
restorants[10] = "10.6.0.4:4000";
restorants[11] = "10.2.0.25:3000";
restorants[12] = "10.8.0.20:3000";
restorants[13] = "10.9.0.16:3000";
restorants[14] = "10.11.0.16:3000";
restorants[15] = "10.14.0.19:3000";
restorants[16] = "192.168.15.95:3006";

//service require
const MailService = require("./services/MailService")


//service init
const mailService = new MailService()


async function init() {
  try{
    let settings = await service.getDriveSettings()
    for(let item of settings){

      restorants[item.number] = item.ip
      adresses[item.number] = item.address
    }
    return true
  }
  catch (e) {
    console.log(e)
  }
}
init()
    .then((value)=>{
      console.log("Init Success: "+value)
      console.log(restorants)
      console.log(adresses)
    })
    .catch(err => {
      console.log(err)
    })
// for(let i in restorants){
//
//   let num = restorants[i].split(".")[1]
//   if(num == "168") {
//     num = "1"
//   }
//   let prop = ""
//
//   let name = "РБ "+num
//   if(i == 16){
//     prop = "drive"
//     name += " Авто"
//   }
//   let data = {
//     name,
//     ip: restorants[i],
//     prop,
//     number: Number(i)
//   }
//   service.setDriveSettings(data)
//   console.log(data)
//
// }


var sendStation = [];
sendStation[0] = 0;
sendStation[1] = 1;
sendStation[2] = 2;
sendStation[3] = 3;
sendStation[4] = 4;
sendStation[5] = 5;
sendStation[6] = 5;
sendStation[7] = 7;
var port = 3003;
http.Server(app).listen(port);
app.use(express.static('public'));
const https = require('https');

var secret = 'asd123zxc';
var order = {};
app.get('/test', function(req,res){
var urla = req.query.url;
var num = 0;
intervalFunc(urla, num);
res.status(200).end();


});


function selectStation(data){

if(data == 0 || data == 1 || data == 2 || data == 3 || data == 4 || data == 5 || data == 6 || data == 7 || data == 8 || data == 10 || data == 11 ||  data == 9 ||  data == 12 ||  data == 13 || data == 14 || data == undefined){
if(data == 1 || data == 6 || data == 3){
  return 1;
}
else if(data == undefined){
  return 0;
}
else if (data == 2 || data == 5) {
  return 2;
}
else if (data == 11) {
  return 4;
}
}
else {

  if(data == 'сбор'){
    return 1;
  }
  else if(data == undefined){
    return 0;
  }
  else if (data == 'фри') {
    return 2;
  }
  else if (data == 'пиц') {
    return 4;
  }
  return 0;
}


}

function intervalFunc(urla, num) {
  num++;
  if(num > 10){
    return;
  }
  http.get('http://'+urla, (ress) => {
  const { statusCode } = ress;
  let error;
  if (statusCode !== 200) {
    error = new Error('Ну удалось отправить сообщение на '+urla+' !');
  }
  if (error) {
    console.error(error.message);
    ress.resume();
    return;
  }
  //console.log("Сообщение на "+urla+" успешно  доставлено, попытка завершена!")
  return;

}).on('error', (e) => {
 console.error('Ну удалось отправить сообщение на '+urla+' !');
 let thisdate = new Date();
 console.log(thisdate);
 console.log(e);
  });
}


function sendData(name, unit, id, num, rest, station) {
  num++;
  if(num > 10){
    return;
  }
  name = encodeURI(name);
  http.get('http://'+restorants[rest]+'/new/?name='+name+'&unit='+unit+'&id='+id+'&station='+station, (ress) => {
  const { statusCode } = ress;
  let error;
  if (statusCode !== 200) {
    error = new Error('Ну удалось отправить сообщение позиции '+id+' !');
  }
  if (error) {
    let thisdate = new Date();
    console.log(thisdate);
    console.error(error.message);
    ress.resume();
    return;
  }
  return;

}).on('error', (e) => {
 console.error('Ну удалось отправить сообщение позиции '+id+' !');

  });
}


function sendDataPaid(id, typeCheck, num, rest, codeApp, client_name) {
  if(client_name){
      client_name = encodeURI(client_name)
  }else{
      client_name = ''
  }

  num++;
  if(codeApp){
    codeApp = String(codeApp)
  }else{
    codeApp = ""
  }
  if(num > 10){
    return;
  }

  http.get('http://'+restorants[rest]+'/newCheck/?id='+id+'&checkType='+typeCheck+'&code='+codeApp+'&guestName='+client_name+'', (ress) => {
    let thisdate = new Date();
  console.log("\r \n Отправлен заказ: " + id + " , ip: " + restorants[rest] + " , дата: "+thisdate);
  const { statusCode } = ress;
  let error;
  if (statusCode !== 200) {
    error = new Error('Ну удалось отправить сообщение чека '+id+'  !');
  }
  if (error) {
    console.error(error.message);
    ress.resume();
    return;
  }
  return;
}).on('error', (e) => {
 console.error('Ну удалось отправить сообщение '+id+' !');
  });
}


app.get('/updateorder', async function(req,res){

  let token = req.query.token;
  if(token == '234Gwdli2g') {
  try {
    console.log(1)
    let orderid = req.query.order_id;
    const result = await fetch('https://delivery.rb24.ru/common_api/order/'+orderid+'?apikey=ZmFkMTlhNzQyMGRhMGI4N2NlOTQwZTI0MmQ3OTk1MTU3NjIwMmRkMA', {
      method: "GET"
    })
    const json = await result.json()
    const settings = await service.getDriveSettings()
    const restoran = settings.find(i => i.number == json.workshop_id)
    if(restoran.prop != "drive") {
      res.sendStatus(200)
      return
    }
    await fetch(`http://${restorants[json.workshop_id]}/take_out/?order=${orderid}&comment=${encodeURI(json.comment)}`, {
      method: "GET"
    })
    res.sendStatus(200)
  }
  catch (e) {
    res.sendStatus(503)
  }

  }
  else{
    res.sendStatus(503)
  }
})

app.get('/getorder', function(req,res){
var token = req.query.token;
if(token == '234Gwdli2g'){

var orderid = req.query.order_id;
var restid = req.query.rest;

order[orderid] = {};

https.get('https://delivery.rb24.ru/common_api/order/'+orderid+'?apikey=ZmFkMTlhNzQyMGRhMGI4N2NlOTQwZTI0MmQ3OTk1MTU3NjIwMmRkMA', (ress) => {
  const { statusCode } = ress;
  const contentType = ress.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    ress.resume();
    return;
  }


  let rawData = [];
  var newhtml = '';
  ress.on('data', (chunk) => { rawData.push(chunk); });
  ress.on('end', async () => {
    try {
      var decodedBody = iconv.decode(Buffer.concat(rawData), 'utf8');
      const parsedData = JSON.parse(decodedBody);
      if(!parsedData.client_name){
          parsedData.client_name = ''
      }
      //console.log(parsedData);
      var type = parsedData.source;
      let typeNum = 3
      if (type == "site" || type == "phone"){
        typeNum = 3;
      }
      else if(type == "mobile_app"){

        if(parsedData.is_pickup_app && parsedData.pickup_takeaway){
            typeNum = 4;
        }
        if(parsedData.is_pickup_app && !parsedData.pickup_takeaway){
            typeNum = 5;
        }

      }
      else{
        typeNum = 3;
      }

        if (parsedData.workshop_id){
        let debug = {
            id: parsedData.id,
            source: parsedData.source,
            workshop_id: parsedData.workshop_id,
            isApp: parsedData.is_pickup_app,
            codeApp: parsedData.code


        };
        //console.log(debug);
      for(var i = 0; i < parsedData.positions.length; i++){


        for( var ii = 0; ii < parsedData.positions[i].quantity; ii++){
          var item_id = orderid+"P"+i+"C"+ii;

          var ifBillInfo = parsedData.positions[i].bill_info;

          if(!ifBillInfo){
            sendData(parsedData.positions[i].name, orderid, item_id, 0, parsedData.workshop_id, selectStation(parsedData.positions[i].main_section_id[0]));

          }
          else{
            var bill_info_arr = parsedData.positions[i].bill_info.split('/');
            for (var iii = 0; iii < bill_info_arr.length; iii++){
              if(bill_info_arr[iii]){
                var bill_info_positions = bill_info_arr[iii].split(',');

                for (var iiii = 0; iiii < bill_info_positions[1]; iiii++){
                  var item_id_set = orderid+"P"+i+"C"+ii+"S"+iii+"N"+iiii;
                    sendData(bill_info_positions[0], orderid, item_id_set, 0, parsedData.workshop_id, selectStation(bill_info_positions[2].replace(' ', '')));

                }
              }
            }
          }

        }

      }


      setTimeout(sendDataPaid, 2000, orderid, typeNum, 0, parsedData.workshop_id, parsedData.code, parsedData.client_name);

      if(parsedData.address && parsedData.delivery_time_local && typeNum === 3){
        const text = mailService.parseDataToTextEmail(parsedData)
        await mailService.sendEmailDarall("РоялБургер Заказ №"+orderid, text)

      }


      var jsonData = {};
        jsonData.error = "0";
        jsonData = JSON.stringify(jsonData);
        jsonData = JSON.parse(jsonData);

      res.status(200).json(jsonData);

    }
    else{
      var jsonData = {};
        jsonData.error = "1";
        jsonData = JSON.stringify(jsonData);
        jsonData = JSON.parse(jsonData);
      console.log("Не указан магазин");
      res.status(200).json(jsonData);
    }


    } catch (e) {
      console.error(e.message);
    }

  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});





}
else{

  res.status(401).end();
}

});
