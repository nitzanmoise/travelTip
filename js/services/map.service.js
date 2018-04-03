import { GoogleMapsApi } from './gmap.class.js';

var map;

function initMap(lat = 32.0749831, lng = 34.9120554) {

    console.log('InitMap');
    document.querySelector(".location-info").innerHTML = `<p>Getting position...</p>`
    document.querySelector(".weather-temp").innerHTML = `<div class="getting-weather">Getting weather info...</div>`;

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
    var image = 'img/if_location_1814106.png';

    marker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image
    });
    markers.push(marker);
}


function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
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
    clearMarkers,
    showMarkers,
    deleteMarkers
}

