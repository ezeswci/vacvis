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
        snippet: "Proxima: "+parseDate(paciente.proxima_prestacion),
        animation: plugin.google.maps.Animation.BOUNCE
      },
       function(marker) {
          marker.on(plugin.google.maps.event.INFO_CLICK, function(marker) {
            goToPacient(marker);// {"lat":nro,"lng":nro}
        });
          marker.addEventListener( plugin.google.maps.event.MARKER_CLICK, function() {
                             marker.showInfoWindow();
                           }
          );
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
          marker.showInfoWindow();
          marker.on(plugin.google.maps.event.INFO_CLICK, function(marker) {
            goToPacient(marker);
        });
          marker.addEventListener( plugin.google.maps.event.MARKER_CLICK, function() {
                             marker.showInfoWindow();
                           }
          );
      });
    }
  }
}
function goToPacient(geo){
  // geo = {"lat":nro,"lng":nro}
  var patients=window.memory.patients;
  for(patient in patients){
    paciente=patients[patient];
    if(paciente.geo.latitud==geo.lat&&paciente.geo.longitud==geo.lng){
      window.location="paciente.html?id="+paciente.id;
    }
  }
}
