
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
  //navigator.notification.vibrate(3000);
  navigator.notification.beep(2);
  });

   $("#geolocaliza").on('pageinit',function_geo); //GPS

   $("#btn_saveContact").on('vclick',function_Agenda); // Agenda de contactos

   $("#btn_StartVideo").on('vclick',function_Media); // Reproductor de video
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

//Funciones que utiliza el GPS
function function_geo(){
   $("#resultado4").html("Esperando al GPS");
   
   //var watch = navigator.geolocation.watchPosition(onInfo,onErrorGPS,{timeout:30000});
   var watchID = navigator.geolocation.watchPosition(onInfo, onErrorGPS, { enableHighAccuracy: true });
}

function onInfo(position){
    $("#resultado4").html('Latitude: '    + position.coords.latitude          + '</br>' +
					'Longitude: '         + position.coords.longitude         + '</br>' +
					'Altitude: '          + position.coords.altitude          + '</br>' +
					'Accuracy: '          + position.coords.accuracy          + '</br>' +
					'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '</br>' +
					'Heading: '           + position.coords.heading           + '</br>' +
					'Speed: '             + position.coords.speed             + '</br>' +
					'Timestamp: '         + position.timestamp                + '</br>');
}

function onErrorGPS(error){
   navigator.notification.alert("Error GPS, codigo: "+error.code+"  message: "+error.message);
}

//Funciones que utilizamos para guardar un contacto
function function_Agenda(evt){
   //evt.preventDefault();
   //evt.stopInmediatePropagation();
   alert("Hola Contacto");
   var mycontacto = navigator.contacts.create();

   mycontacto.displayName= "PruebaCont";

   var nombre= new ContactName();

   nombre.familyName = "Linda";
   nombre.middleName = "L. E.";
   mycontacto.name= nombre;

   mycontacto.phoneNumbers = [];
   mycontacto.phoneNumbers[0] = new ContactField("home","7654773");

   mycontacto.save(OnGuardado,OnErrorContact);
}

function OnGuardado(contacto){
   alert("Contacto guardado "+contacto);
}

function OnErrorContact(error){
	alert("Error "+error.message);
}

//Funciones utilizadas para reproducir un video
function function_Media(evt){
   //evt.preventDefault();
   //evt.stopInmediatePropagation();
   alert("Hola Audio");
   playAudio("http://audio.ibeat.org/?ccm=/api/query/stream.m3u&f=m3u&ids=697");
}

var media= null;
var timmer = null;

function playAudio(src){
	if(media === null){
       media = new Media(src,OnSuccesAudio,OnErrorAudio); //Busca el audio 
    }
   media.play();

   if(timmer === null){
    timmer = setInterval(
			function(){
				media.getCurrentPosition(
						function(position){
							if(position > -1){
								$("#resultadoAudio").html("Pos = "+position);
							}
						},
						function(error){ //Error
							$("#resultadoAudio").html("Error = "+error);
							setAudioPosition("Error: "+error);
						}
					);
			}, 1000);
   }
}

function OnSuccesAudio(){
	alert("Audio cargado Ok.");
}

function OnErrorAudio(error){
   alert("Error al encontrar audio "+error.code);
}


