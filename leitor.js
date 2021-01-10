const fs = require('fs')
const csv = require('csv-parser')
const randomWords = require('random-words')
const users = [];


fs.createReadStream('ENTRADA.csv')
.pipe(csv())
.on('data', function (row) {
  var VALIDA = "nao";
  var IDBROKER = "";


  
  if (row.DDD != 11){
    if (row.MENSAGEM.length < 140){
      if (row.DDD.length == 2){
        if  (row.DDD > 2){  
          if (row.CELULAR.length == 9){
            if (row.CELULAR.substring(0, 1) == 9){
              if (row.CELULAR.substring(1, 2) >= 6){
                if ((row.HORARIO_ENVIO < '19:59:59') && (row.HORARIO_ENVIO > '08:00:00')){
                  VALIDA = "sim";
                }
              }
            }
          }
        }                                                               
      }
    }
  } 
   

  if (row.OPERADORA == "VIVO" || row.OPERADORA == "TIM"){
    IDBROKER = "1";
    } else if (row.OPERADORA == "CLARO" || row.OPERADORA == "OI"){
      IDBROKER = "2";
    } else if (row.OPERADORA == "NEXTEL"){
      IDBROKER = "3";
    } else 
    IDBROKER = "BROKER NAO ESPECIFICADO";
    
    const user = {
      IDMENSAGEM: row.IDMENSAGEM,
      DDD: row.DDD,
      CELULAR: row.CELULAR,
      OPERADORA: row.OPERADORA,
      HORARIO_ENVIO: row.HORARIO_ENVIO,
      MENSAGEM: row.MENSAGEM,
      IDBROKER,
      VALIDA
    }

  users.push(user)
  })
  .on('end', function () {
      console.table(users)
    })