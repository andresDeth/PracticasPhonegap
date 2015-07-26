
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
  var watch= navigator.accelerometer.watchAcceleration(onSuccess, onError,{frequency: 1000});
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