var map;
document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div);

  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);

function onMapReady() {
  alert("Mapa listo!");
}
function onButtonClick() {
  alert("Click en boton");
  // Move to the position with animation
  // (-34.4191274,-58.81449651,-34.418242,-58.815308))
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
    map.addMarker({
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
    });
  });
}
