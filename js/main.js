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
                        var lng =  pos.coords.longitude;
                        console.log('User position is:', pos.coords);
                        mapService.moveCenter(lat, lng)
                        mapService.addMarker({ lat, lng });
                        getAdressFromCoords({lat, lng})
                        .then(res => {
                            // console.log({ res });
                            // console.log(res.results[0].formatted_address);
                            var adresInfo = res.results[0].formatted_address;
                            
                            document.querySelector(".location-info").innerHTML = `${adresInfo}`
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
    console.log('Thanks!');
}


document.querySelector('.btn1').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
})


var getAdressFromCoords = ({lat, lng}) => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${locService.API_KEY}`)
        .then(res => res.json())
}

var getAdressFromName = name => {
    console.log('getting address')
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${locService.API_KEY}`)
        .then(res => res.json())
}
getAdressFromName()
.then(res => {
    console.log('this is adress',{ res });
})

