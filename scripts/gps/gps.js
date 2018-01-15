
// Esto es para hacer un render en un Mapa
/*BackgroundGeolocation.getLocations(
  function (locations) {
    console.log(locations);
  }
); */
document.addEventListener('deviceready', onDeviceReadyGps, false);
function onDeviceReadyGps() {
  alert('comienza mambo GPS');
  BackgroundGeolocation.configure({
    debug: true,
    desiredAccuracy:'HIGH_ACCURACY',
    maxLocations:10// No me interesa mucho guardar las locations, por eso le pongo 10
  });
  checkStatusGPS();
  setTimeout(function(){ startLocation(); }, 3000);
}
function checkStatusGPS(){
  aler('checkStatusGPS');
  BackgroundGeolocation.checkStatus(checkStatusSuccess, checkStatusFail);
}
function checkStatusSuccess(response){
  alert('checkStatusSuccess: '+JSON.stringify(response));
}
function checkStatusFail(response){
  alert('checkStatusFail: '+JSON.stringify(response));
}
// start()
function startLocation(){
  aler('startLocation');
  BackgroundGeolocation.start();
  setTimeout(function(){ checkFive(1); }, 3000);
}
function checkFive(nro){
  aler('checkFive');
  BackgroundGeolocation.getLocations(getLocationsSuccess, getLocationsFail);
  nro++;
  if(nro<=3){
    setTimeout(function(){ checkFive(nro); }, 3000);
  }else{
    BackgroundGeolocation.stop();
    BackgroundGeolocation.checkStatus(checkStatusSuccess, checkStatusFail);
    BackgroundGeolocation.getLocations(getLocationsSuccess, getLocationsFail);
  }
}
function getLocationsSuccess(response){
  alert('getLocationsSuccess: '+JSON.stringify(response));
}
function getLocationsFail(response){
  alert('getLocationsFail: '+JSON.stringify(response));
}
// stop()
// getLocations(success, fail)
