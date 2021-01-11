const fs = require('fs')
const csv = require('csv-parser')
const users = [];


fs.createReadStream('./ArquivoEntrada/ENTRADA.csv')
.pipe(csv())
.on('data', function (row) {
  var VALIDA = "nao";
  var IDBROKER = "";


  
  if ((row.DDD != 11) &&
      (row.MENSAGEM.length <= 140) &&
      (row.DDD.length == 2) &&
      (row.DDD > 2) &&
      (row.CELULAR.length == 9) &&
      (row.CELULAR.substring(0, 1) == 9) &&
      (row.CELULAR.substring(1, 2) >= 6) &&
      (row.HORARIO_ENVIO < '19:59:59') && 
      (row.HORARIO_ENVIO > '08:00:00')){
        VALIDA = "sim";
  }
   

  if (row.OPERADORA == "VIVO" || row.OPERADORA == "TIM"){
    IDBROKER = "1";
    } else if (row.OPERADORA == "CLARO" || row.OPERADORA == "OI"){
      IDBROKER = "2";
    } else if (row.OPERADORA == "NEXTEL"){
      IDBROKER = "3";
    } else 
    IDBROKER = "BROKER NAO ESPECIFICADO";
    


  var telefonecompleto = row.DDD + row.CELULAR;
  const https = require('https');
  var aaa = 'https://front-test-pg.herokuapp.com/blacklist/'+telefonecompleto;
  
  let req = https.get(aaa, function(res) {
  	let data = '',
      json_data;
      
  	res.on('data', function(stream) {
  		data += stream;
  	});
  	res.on('end', function() {
  	  json_data = JSON.parse(data);
       
      
      if (json_data.active == true){
        VALIDA = "nao";
      }
           
    });
  });
              
  const user = {
    IDMENSAGEM: row.IDMENSAGEM,
    IDBROKER
  }
           
  if (VALIDA == "sim"){ 
    users.push(user)
  } 
})
  .on('end', function () {
      console.table(users)
    })