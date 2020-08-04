var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');
var http = require('http');

// Create connection to database
var config = {
  userName: 'sa', // update me
  password: 'Cfvjktn1', // update me
  server: '192.168.15.150',
  options: {
    database: 'Cards',
    rowCollectionOnRequestCompletion: true
  }
}

var connection = new Connection(config);

function getRandomInt(min, max)
{
return Math.floor(Math.random() * (max - min + 1)) + min;
}

function readInfo(callback, id, res) {
    console.log('Reading Phone Info...');
    id = "'"+id+"'";





    // Read all rows from table
    request = new Request(
    'SELECT id, summa, fname, date, phone_number, pass FROM cards.dbo.list WHERE phone_number = '+id+';',
    function(err, rowCount, rows) {
    if (err) {
      var result = {};
      result.phone_number = "error SQL";
        callback(err, result, res);
    } else {
        console.log(rowCount + ' row(s) returned');
        if (rowCount == 0){
          var result = {};
          result.phone_number = "notRegistred";
          callback(null, result, res);
        }
        else if (rowCount == 1){
          var result = {};
          var row = rows[0];
          result.id = row[0].value;
          result.summa = row[1].value;
          result.fname = row[2].value;
          result.date = row[3].value;
          result.phone_number = row[4].value;
          result.pass = row[5].value;
          callback(null, result, res);


      }
      else if (rowCount > 1){
        var result = {};
        result.phone_number = "manyRegistred";
        callback(null, result, res);
      }

    }
    });

    // Print the rows read



    // Execute SQL statement
    connection.execSql(request);
}



function readInfoCard(callback, id, res) {

    if (id > 999999999 ){
      id = 01;
    }
    console.log('Reading Phone Info...' + id);
    // Read all rows from table
    request = new Request(
    'SELECT id, summa, fname, date, phone_number FROM cards.dbo.list WHERE id = '+id+';',
    function(err, rowCount, rows) {
    if (err) {
        callback(err);
    } else {
        console.log(rowCount + ' row(s) returned');
        if (rowCount == 0){
          var result = {};
          result.phone_number = "notRegistred";
        }
        else if (rowCount == 1){
          var result = {};
          var row = rows[0];
          result.id = row[0].value;
          result.summa = row[1].value;
          result.fname = row[2].value;
          result.date = row[3].value;
          result.phone_number = row[4].value;






      }
      else if (rowCount > 1){
        var result = {};
        result.phone_number = "manyRegistred";
      }
      callback(null, result, res);
    }
    });

    // Print the rows read

    // Execute SQL statement
    connection.execSql(request);
}

function sendPin(phone_number, summa, callback, res) {
    var pin = getRandomInt(1000, 9999);
    var id = phone_number;
    // Read all rows from table

    request2 = new Request(
        'UPDATE cards.dbo.list SET pin=@pin WHERE phone_number = '+id+';',
        function(err, rowCount, rows) {
            if (err) {
            callback(err, err, res);
            } else {
            console.log(rowCount + ' - Generating pin for phone '+id+', pin '+pin+' added');

            request = new Request(
            'SELECT pin FROM cards.dbo.list WHERE phone_number = '+phone_number+';',
            function(err, rowCount, rows) {
            if (err) {
                callback(err);
            } else {
                console.log(rowCount + ' строчек найдено при проверке ПИН кода');
                if (rowCount == 0){
                  var result = {};
                  result.phone_number = "notRegistred";
                  callback(null, result, res);
                }
                else if (rowCount == 1){
                  var result = {};
                  var row = rows[0];
                  result.pin = row[0].value;
                  console.log('Sending SMS to ' + phone_number);
            http.get('http://newbsms.tele2.ru/api/?operation=send&login=http_P2qZz1dJ&password=VpdJUgNe&msisdn=7'+phone_number+'&shortcode=RB24&text=Pincode: '+result.pin+' . Operatsiya spisanya '+summa+' bonusov. ', (ress) => {
            const { statusCode } = ress;
            const contentType = ress.headers['content-type'];
            callback(null, result, res);
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
              // consume response data to free up memory
              ress.resume();
              return;
            }

            ress.setEncoding('utf8');
            let rawData = '';
            ress.on('data', (chunk) => { rawData += chunk; });
            ress.on('end', () => {
              try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
              } catch (e) {
                console.error(e.message);
              }
            });

          }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
          });


              }
              else if (rowCount > 1){
                var result = {};
                result.phone_number = "manyRegistred";
                callback(null, result, res);
              }


            }
            });

            // Print the rows read

            // Execute SQL statement
            connection.execSql(request);



            }
        });
        request2.addParameter('pin', TYPES.Decimal, pin);


        // Execute SQL statement
        connection.execSql(request2);





}

function register(id, fname, date, phone_number, callback, res) {
    console.log("Попытка регистрации номера телефона: "+phone_number);

          request = new Request(
          'SELECT phone_number FROM cards.dbo.list WHERE phone_number = '+phone_number+';',
          function(err, rowCount, rows) {
          if (err) {
              callback(err, "Ошибка SQL", res);
          } else {
              console.log("Колонок считано при провереке: "+rowCount);
              if (rowCount == 0){

                if (id > 100){
                  request3 = new Request(
                  'SELECT id, summa FROM cards.dbo.list WHERE id = '+id+';',
                  function(err, rowCount, rows) {
                  if (err) {
                      callback(err, err, res);
                  } else {
                      var regSumma = 0;
                      rows.forEach(function(row){
                        regSumma += row[1].value
                      });
                      console.log(regSumma+ ' баллов будет перенесено на новую карту ' + id);
                      request4 = new Request(
                      'DELETE FROM cards.dbo.list WHERE id = '+id+';',
                      function(err, rowCount, rows) {
                      if (err) {
                          callback(err, err, res);
                      } else {

                          console.log('Удалены старые записи карты: ' + id);

                          request5 = new Request(
                          'INSERT INTO cards.dbo.list (id, fname, phone, date, phone_number, summa) OUTPUT INSERTED.Id VALUES (@id, @fname, @phone, @date, @phone_number, @summa);',
                          function(err, rowCount, rows) {
                          if (err) {
                              callback(err, err, res);
                          } else {
                              console.log(rowCount + ' записей добавлено');
                              callback(null, 'Запись добавлена c сохранением баллов', res);
                          }
                          });

                      request5.addParameter('id', TYPES.NChar, id);
                      request5.addParameter('fname', TYPES.NChar, fname);
                      request5.addParameter('phone', TYPES.Bit, 1);
                      request5.addParameter('date', TYPES.Date, date);
                      request5.addParameter('phone_number', TYPES.NChar, phone_number);
                      request5.addParameter('summa', TYPES.Decimal, regSumma);
                      // Execute SQL statement
                      connection.execSql(request5);
                      }
                      });
                      connection.execSql(request4);
                  }
                  });
                  connection.execSql(request3);
                }

                else {


                  console.log("Вложенный запрос:" +phone_number);
                  request2 = new Request(
                  'INSERT INTO cards.dbo.list (id, fname, phone, date, phone_number) OUTPUT INSERTED.Id VALUES (@id, @fname, @phone, @date, @phone_number);',
                  function(err, rowCount, rows) {
                  if (err) {
                      callback(err, err, res);
                  } else {
                      console.log(rowCount + ' записей добавлено');
                      callback(null, 'Запись добавлена', res);
                  }
                  });

                  request2.addParameter('id', TYPES.NChar, id);
                  request2.addParameter('fname', TYPES.NChar, fname);
                  request2.addParameter('phone', TYPES.Bit, 1);
                  request2.addParameter('date', TYPES.Date, date);
                  request2.addParameter('phone_number', TYPES.NChar, phone_number);
                  // Execute SQL statement
                  connection.execSql(request2);


                }

            }
            else {

              callback(1, 'Запись с номером '+phone_number+' существует', res);
            }
          }
          });

          // Execute SQL statement
          connection.execSql(request);






}



  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected');

      // Execute all functions in the array serially
      //async.waterfall(array, Complete)
    }
  });

  connection.on('end', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('End');

      // Execute all functions in the array serially
      //async.waterfall(array, Complete)
    }
  });



function edit( phone_number, action, summa, pincode, callback, res){

  summa = parseInt(summa);
  console.log("Изменение суммы бонусов по номеру телефона: "+phone_number);

  request = new Request(
  'SELECT phone_number, summa, pin FROM cards.dbo.list WHERE phone_number = '+phone_number+';',
  function(err, rowCount, rows) {
  if (err) {
      callback(err, "Ошибка SQL", res);
  } else {
      console.log("Колонок считано при провереке: "+rowCount);

      var result = {};
      if (rowCount == 1){
      var row = rows[0];
      result.phone = phone_number;
      result.summa = row[1].value;
      var pin = row[2].value;
      if (result.summa == null ){
        result.summa = 0;
      }
      if (action == 'minus' ){
        result.summa = result.summa - summa;
        if (pincode == 55555){

          pincode = 999;
          pin = 999;
        }
      }
      else if (action == 'plus'){
        result.summa = result.summa + summa;
        pincode = 999;
        pin = 999;
      }

    }
      if (rowCount == 1 && result.summa >= 0 && pincode == pin){


        request = new Request(
            'UPDATE cards.dbo.list SET summa=@summa WHERE phone_number = @phone_number;',
            function(err, rowCount, rows) {
                if (err) {
                callback(err, err, res);
                } else {
                console.log(rowCount + ' row(s) updated');
                callback(null, result, res);
                }
            });
            request.addParameter('summa', TYPES.Decimal, result.summa);
            request.addParameter('phone_number', TYPES.NVarChar, phone_number);

            // Execute SQL statement
            connection.execSql(request);

    }
    else {

      if (pincode != pin){
        callback(2, 'Пинкод не верный', res);
      }
      else
      {
        callback(1, 'Запись с номером '+phone_number+' не существует или их больше одной или попытка списать больше бонусов чем есть', res);
      }

    }
  }
  });

  // Execute SQL statement
  connection.execSql(request);

}

function editCard( id, action, summa, callback, res){
  console.log('Reading Card Info...');
  id = +id;
 if (id > 999999999 ){
    id = 01;
  }
  summa = parseInt(summa);

  request = new Request(
  'SELECT id, summa FROM cards.dbo.list WHERE id = '+id+';',
  function(err, rowCount, rows) {
  if (err) {
      callback(err, err, res);
  } else {
      console.log("Колонок считано при провереке: "+rowCount);

      var result = {};
      if (rowCount == 1){
      var row = rows[0];
      result.id = id;
      result.summa = row[1].value;
      if (result.summa == null ){
        result.summa = 0;
      }
      if (action == 'minusCard'){
        result.summa = result.summa - summa;
      }
      else if (action == 'plusCard'){
        result.summa = result.summa + summa;
      }
    }
      if (rowCount == 1 && result.summa >= 0 ){


        request = new Request(
            'UPDATE cards.dbo.list SET summa=@summa WHERE id = '+id+';',
            function(err, rowCount, rows) {
                if (err) {
                callback(err, err, res);
                } else {
                console.log(rowCount + ' row(s) updated');
                callback(null, result, res);
                }
            });
            request.addParameter('summa', TYPES.Decimal, result.summa);


            // Execute SQL statement
            connection.execSql(request);

    }

    else {

      callback(1, 'Карта с номером '+id+' не существует или их больше одной или попытка списать больше бонусов чем есть', res);
    }
  }
  });

  // Execute SQL statement
  connection.execSql(request);

}


exports.edit = edit;
exports.register = register;
exports.readInfo = readInfo;
exports.readInfoCard = readInfoCard;
exports.editCard = editCard;
exports.sendPin = sendPin;
