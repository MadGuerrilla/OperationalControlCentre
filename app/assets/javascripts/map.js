var mapStyles = [{
    "featureType": "administrative",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "simplified"
    }, {
        "color": "#edeff0"
    }]
}, {
    "featureType": "poi",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.highway",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "simplified"
    }, {
        "color": "#ffffff"
    }]
}, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}]

function initMap() {
    var markers = [];
    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: (mapZoom == 0) ? 6 : mapZoom,
        minZoom: 5,
        center: {
            lat: mapLat,
            lng: mapLng
        },
        streetViewControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        styles: mapStyles
    });

    for (var i = 0; i < nationalViewLocations.length; i++) {
        var data = nationalViewLocations[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.label,
            label: {
                text: data.label
            },
            url: data.url,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 0.1,
                fillColor: data.color,
                strokeOpacity: 1.0,
                strokeColor: data.color,
                strokeWeight: 1.0,
                scale: 7 //pixels
            }
        });
        markers.push(marker);

        //Attach click event to the marker.
        (function(marker, data) {
            google.maps.event.addListener(marker, 'click', function(e) {
                window.location.href = this.url;
            });
        })(marker, data);
    }
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        title: 'data.label',
        label: {
            text: 'data.label'
        },
        //minimumClusterSize: 4,
        gridSize: 80
    });


};
