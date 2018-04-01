console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'

locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(
            () => {


                locService.getPosition()
                    .then(pos => {
                        var lat = pos.coords.latitude;
                        var lng = pos.coords.longitude;
                        console.log('User position is:', pos.coords);
                        mapService.moveCenter(lat, lng)
                        mapService.addMarker({ lat, lng });
                        getAdressFromCoords({ lat, lng })
                            .then(res => {
                                // console.log({ res });
                                console.log(res.results[0].formatted_address);
                                var adresInfo = res.results[0].formatted_address;

                                document.querySelector(".location-info").innerHTML = `${adresInfo}`
                            })
                        getWeatherData(lat, lng)
                            .then(res => {
                                console.log('this is local weather!', res.weather[0].icon);
                                var draw = res.weather[0].icon;
                    var name = res.name;
                    var state = res.sys.country     
                    var description = res.weather[0].description;
                    var temp = res.main.temp    
                    var min = res.main.temp_min
                    var max = res.main.temp_max
                    var wind = res.wind.speed 

                    document.querySelector(".weather-draw").innerHTML = `<img src="http://openweathermap.org/img/w/${draw}.png"></img>`
                    document.querySelector(".weather-location").innerHTML = `${name}, ${state}  <img src="flags_iso/16/${state.toLowerCase()}.png"/>`
                    document.querySelector(".weather-id").innerHTML = description;
                    document.querySelector(".weather-temp").innerHTML =  temperatureConverter(temp);
                    document.querySelector(".min-max").innerHTML = `<p>temperature from ${temperatureConverter(min)} to ${temperatureConverter(max)} wind ${wind} m/s.`; 

                                

                            })

                    })
                    .catch(err => {
                        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });

                    })
            }
        )

        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn1').onclick = () => {
    locService.getPosition()
        .then(pos => {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            console.log('User position is:', pos.coords);
            mapService.moveCenter(lat, lng)
            mapService.addMarker({ lat, lng });
            getAdressFromCoords({ lat, lng })
                .then(res => {
                    // console.log({ res });
                    console.log(res.results[0].formatted_address);
                    var adresInfo = res.results[0].formatted_address;
                    document.querySelector(".location-info").innerHTML = `${adresInfo}`
                })
            getWeatherData(lat, lng)
                .then(res => {
                    console.log('this is local weather!', res.weather[0].icon);
                    var draw = res.weather[0].icon;
                    var name = res.name;   
                    var state = res.sys.country                           
                    var description = res.weather[0].description;
                    var temp = res.main.temp 
                    var min = res.main.temp_min
                    var max = res.main.temp_max
                    var wind = res.wind.speed                              
                    document.querySelector(".weather-draw").innerHTML = `<img src="http://openweathermap.org/img/w/${draw}.png"></img>`
                    document.querySelector(".weather-location").innerHTML = `${name}, ${state}  <img src="flags_iso/16/${state.toLowerCase()}.png"/>`
                    document.querySelector(".weather-id").innerHTML = description;
                    document.querySelector(".weather-temp").innerHTML =  temperatureConverter(temp);
                    document.querySelector(".min-max").innerHTML = `<p>temperature from ${temperatureConverter(min)} to ${temperatureConverter(max)} wind ${wind} m/s.`; 
                })

        })
        .catch(err => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });

        })
}

document.querySelector('.btn2').onclick = () => {
    mapService.clearMarkers();
}
document.querySelector('.btn3').onclick = () => {
    mapService.showMarkers();
}
document.querySelector('.btn4').onclick = () => {
    mapService.deleteMarkers();
}


document.querySelector('.search-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    var adress = document.querySelector('.search-input').value;
    console.log('this is search adresss', adress);
    getAdressFromName(adress)
        .then(res => {
            console.log('this is adress', res);
            let lat = res.results[0].geometry.location.lat;
            let lng = res.results[0].geometry.location.lng
            mapService.moveCenter(lat, lng)
            mapService.addMarker({ lat, lng });
            console.log(res.results[0].formatted_address);
            var adressInfo = res.results[0].formatted_address;
            document.querySelector(".location-info").innerHTML = `${adressInfo}`
            getWeatherData(lat, lng)
                .then(res => {
                    console.log('this is searched weather!', res);
                    var draw = res.weather[0].icon;
                    var name = res.name;     
                    var state = res.sys.country                         
                    var description = res.weather[0].description;
                    var temp = res.main.temp  
                    var min = res.main.temp_min
                    var max = res.main.temp_max
                    var wind = res.wind.speed                        
                    document.querySelector(".weather-draw").innerHTML = `<img src="http://openweathermap.org/img/w/${draw}.png"></img>`
                    document.querySelector(".weather-location").innerHTML = `${name}, ${state}  <img src="flags_iso/16/${state.toLowerCase()}.png"/>`
                    document.querySelector(".weather-id").innerHTML = description;
                    document.querySelector(".weather-temp").innerHTML =  temperatureConverter(temp);
                    document.querySelector(".min-max").innerHTML = `<p>temperature from ${temperatureConverter(min)} to ${temperatureConverter(max)} wind ${wind} m/s.`; 

                    
                })

        })

})

function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    var celius = `${parseInt(valNum-273.15, 10)}ºC`;
    return celius;
  }





var getAdressFromCoords = ({ lat, lng }) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${locService.API_KEY}`)
        .then(res => res.json())
}

var getAdressFromName = (value) => {
    console.log('getting address')
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${locService.API_KEY}`)
        .then(res => res.json())
}

var W_KEY = `083c426ccf6b0b56b85c94666ad2c020`;
var getWeatherData = (lat, lng) => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${W_KEY}`)
        .then(res => res.json())
}















