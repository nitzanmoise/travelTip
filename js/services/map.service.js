import { GoogleMapsApi } from './gmap.class.js';

var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {

    console.log('InitMap');

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })

        console.log('Map!', map);
    });
}

function moveCenter(lat, lng){
    map.setCenter({lat, lng})
    
}

var markers = [];
function addMarker(loc) {
    var marker;
    marker = 0;
    marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    markers.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length-1; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }


export default {
    initMap,
    addMarker,
    moveCenter,
    markers,
    // hideLastMarkers,
    // showAllMarkers
    clearMarkers,
    showMarkers,
    deleteMarkers

}

