var map;
document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");
  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);
  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);
function volverAlAnterior(){
  if(getQueryVariableTranslated("id")>0){
    window.location='paciente.html?id='+getQueryVariableTranslated("id");
  }else{
    window.location='pacientes.html';
  }
}
function onMapReady(){
    map.clear();// Comienza siempre con un mapa fresco
  if(getQueryVariableTranslated("id")>0){
    openOnlyOnePacient();
  }else{
    allPacients();
  }
}
function allPacients(){
  var patients=window.memory.patients;
  for(patient in patients){
    paciente=patients[patient];
    if(patient==0){
      map.animateCamera({
        target: {lat: paciente.geo.latitud, lng: paciente.geo.longitud},
        zoom: 10
      });
    }
    map.addMarker({
      position: {lat: paciente.geo.latitud, lng: paciente.geo.longitud},
      title: paciente.name+" "+paciente.lastname+" \n" +paciente.dir,
      snippet: "Proxima: "+parseDate(paciente.proxima_prestacion)+" \n" +"-id="+paciente.id,
      animation: plugin.google.maps.Animation.BOUNCE
    },
     function(marker) {
       var pid=paciente.id;
        marker.on(plugin.google.maps.event.INFO_CLICK, function(marker) {
          console.log(JSON.stringify(marker));
          alert(JSON.stringify(marker));
          //window.location="paciente.html?id="+pid;
      });
    });
  }
}
function openOnlyOnePacient(){
  map.animateCamera({
    target: {lat: getQueryVariableTranslated("lat"), lng: getQueryVariableTranslated("lng")},
    zoom: 13
  });
  map.addCircle({
  'center': {lat: getQueryVariableTranslated("lat"), lng: getQueryVariableTranslated("lng")},
  'radius': 40,
  'strokeColor' : '#176c99',
  'strokeWidth': 5,
  'fillColor' : '#6ab2ec'
  });
  var patients=window.memory.patients;
  for(patient in patients){
    paciente=patients[patient];
    var pid=getQueryVariableTranslated("id");
    if(paciente.id==pid){
      map.addMarker({
        position: {lat: paciente.geo.latitud, lng: paciente.geo.longitud},
        title: paciente.name+" "+paciente.lastname+" \n" +paciente.dir,
        snippet: "Proxima: "+parseDate(paciente.proxima_prestacion),
        animation: plugin.google.maps.Animation.BOUNCE
      }, function(marker) {
          marker.on(plugin.google.maps.event.INFO_CLICK, function() {
          window.location="paciente.html?id="+paciente.id;
        });
      });
    }
  }
}
function goToPacient(str){
  var index=str.indexOf("-id=")+4;
  window.location="paciente.html?id="+str.substring(index);

}
