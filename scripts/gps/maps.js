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
  if(getQueryVariableTranslated("id")>0){
    openOnlyOnePacient();
  }else{
    allPacients();
  }
}
function allPacients(){
  map.animateCamera({
    target: {lat: -34.543849, lng: -58.474227},
    zoom: 17
  });
  var patients=window.memory.patients;
  for(patient in patients){
    paciente=patients[patient];
    map.addMarker({
      position: {lat: paciente.geo.latitud, lng: paciente.geo.longitud},
      title: paciente.name+" "+paciente.lastname+" \n" +paciente.dir,
      snippet: "Proxima: "+parseDate(paciente.proxima_prestacion),
      animation: plugin.google.maps.Animation.BOUNCE
    }, function(marker) {
      // Show the info window
      //marker.showInfoWindow();
      // Catch the click event
      marker.on(plugin.google.maps.event.INFO_CLICK, function() {
        // To do something...
        window.location="paciente.html?id="+paciente.id;
      });
    });
  }
}
function openOnlyOnePacient(){




  plugin.google.maps.LocationService.getMyLocation(function(result) {
        map.addCircle({
        'center': {lat: location.latLng.lat, lng: location.latLng.lng},
        'radius': 20,
        'strokeColor' : '#176c99',
        'strokeWidth': 5,
        'fillColor' : '#6ab2ec'
      }, function(circle) {});
      map.animateCamera({
        target: {lat: location.latLng.lat, lng: location.latLng.lng},
        zoom: 15,
        tilt: 60,
        bearing: 140,
        duration: 2000
      }, function() {
        var patients=window.memory.patients;
        var pid=getQueryVariableTranslated("id");
        for(patient in patients){
          paciente=patients[patient];
          if(paciente.id==pid){
            map.addMarker({
              position: {lat: paciente.geo.latitud, lng: paciente.geo.longitud},
              title: paciente.name+" "+paciente.lastname+" \n" +paciente.dir,
              snippet: "Proxima: "+parseDate(paciente.proxima_prestacion),
              animation: plugin.google.maps.Animation.BOUNCE
            }, function(marker) {
              // Show the info window
              //marker.showInfoWindow();
              // Catch the click event
              marker.on(plugin.google.maps.event.INFO_CLICK, function() {
                // To do something...
                window.location="paciente.html?id="+paciente.id;
              });
            });
          }
        }
      });
  });
}
/*
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
    });*//*
  });
}*/
