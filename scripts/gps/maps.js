var map;
document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");
  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);
  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);
function volverAlAnterior(){
  if(getQueryVariableTranslated("id")!=null){
    window.location='paciente.html?id='+getQueryVariableTranslated("id");
  }else{
    window.location='pacientes.html';
  }
}
function onMapReady(){
  alert("map ready");
  if(getQueryVariableTranslated("id")!=null){
    alert("only One: "+getQueryVariableTranslated("id"));
    openOnlyOnePacient(getQueryVariableTranslated("id"));
  }else{
    allPacients();
  }
}
function allPacients(){
  alert("allPacients");
  var patients=window.memory.patients;
  for(patient in patients){
    paciente=patients[patient];
    map.addMarker({
      position: {lat: paciente.geo.latitud, lng: paciente.geo.longitud},
      title: paciente.name+" "+paciente.lastname+" \n" +paciente.dir,
      snippet: "Proxima: "+parseDate(paciente.proxima_prestacion)
    }, function(marker) {
      // Show the info window
      marker.showInfoWindow();
      // Catch the click event
      marker.on(plugin.google.maps.event.INFO_CLICK, function() {
        // To do something...
        alert("Abre paciente.html?id="+paciente.id);
      });
    });
  }
  /*
    map.addCircle({
    'center': {lat: ..., lng: ...},
    'radius': 300,
    'strokeColor' : '#AA00FF',
    'strokeWidth': 5,
    'fillColor' : '#880000'
  }, function(circle) { ... });
  */
}
function onMapReady() {
  //alert("Click en boton");
  map.animateCamera({
    target: {lat: -34.4191274, lng: -58.81449651},
    zoom: 17,
    tilt: 60,
    bearing: 140,
    duration: 2000
  }, function() {

    // Add a maker
    map.addMarker({
      position: {lat: -34.418242, lng: -58.81449651},
      title: "Nombre de un paciente \n" +
             "Juan Perez",
      snippet: "Proxima: 10-02-2018",
      animation: plugin.google.maps.Animation.BOUNCE
    }, function(marker) {

      // Show the info window
      marker.showInfoWindow();

      // Catch the click event
      marker.on(plugin.google.maps.event.INFO_CLICK, function() {

        // To do something...
        alert("Abre Juan perez");

      });
    });
    plugin.google.maps.LocationService.getMyLocation(function(result) {
      alert(["Current your location:\n",
          "latitude:" + location.latLng.lat.toFixed(3),
          "longitude:" + location.latLng.lng.toFixed(3),
          "speed:" + location.speed,
          "time:" + location.time,
          "bearing:" + location.bearing].join("\n"));
    });
    /*map.addMarker({
      position: {lat: -34.4191274, lng: -58.81449651},
      title: "Segundo paciente \n" +
             "Pedro Aznar",
      snippet: "Proxima: 15-03-2019",
      animation: plugin.google.maps.Animation.BOUNCE
    }, function(marker) {

      // Show the info window
      marker.showInfoWindow();

      // Catch the click event
      marker.on(plugin.google.maps.event.INFO_CLICK, function() {

        // To do something...
        alert("Abre Pedro");

      });
    });*/
  });
}
