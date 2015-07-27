
 // $(document).ready(function(){
 //   console.log("Hola");
 //  });

function OnBodyLoad(){
   document.addEventListener("deviceready", onDeviceReady, false);
   //onDeviceReady();
}


function onDeviceReady(){
  //Acelerometro: Ejecuta una unica vez
	//navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
  //Ejecuta en periodos de tiempo repetitivamente
  var watch= navigator.accelerometer.watchAcceleration(onSuccess, onError,{frequency: 100});

  $("#notifi_1").on('vclick',function(evt){
     //Mostrar mensajes en dialogo
     navigator.notification.alert("Bienvenidos",function(){},"Alerta","Cerrar");

     //Preguntar al usuario una confirmacion
     navigator.notification.confirm("Esta seguro",function(buttonIndex){},"Confirmacion",["Si","No"]);

     //Solicita al usuario un valor en un cuadro de dialogo
     navigator.notification.prompt("Mensaje prompt",function(buttonIndex, txt_entrada){},"Promt",["Si","Cancelar"],"Mensaje");
  });
  
  $("#notifi_2").on('vclick',function(evt){
  navigator.notification.beep(2);
  navigator.notification.vibrate(1000);
  });
}

function onSuccess(acceleration) {
	$("#txt_acelerometro").html('<strong>Acceleration X: </strong><p>' + acceleration.x + '</p>' +
		'<strong>Acceleration Y: </strong><p>' + acceleration.y + '</p>' +
		'<strong>Acceleration Z: </strong><p>' + acceleration.z + '</p>' +
        '<strong>Timestamp: </strong><p>' + acceleration.timestamp + '</p>');
}

function onError(tx,error) {
    alert('onError!'+error);
}