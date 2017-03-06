//***** MAIN ROUTINE *****//
$(document).ready(function() {  
    initMap(); //Get the traffic route data.
    setInterval(initMap, 300000); //Update the every 5 minutes.
});
//***** END MAIN ROUTINE *****//
//-----=====-----//
//***** UTILITIY FUNCTIONS *****//
function initMap() {
    //Load Map Config Data
    configData = loadConfig();

    //Create Map
    var map
    var mapOptions = {
        zoom: configData.googleMap.zoom,
        zoomControl: true,
        disableDefaultUI: true,
        center: {lat: configData.googleMap.lat, lng: configData.googleMap.lng}
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    //Route Data
    var routeData = new Array;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var request = {
        origin: '2021 Genesta Dr, Buda, TX 78610, USA',
        destination: '1645 E 6th St #200, Austin, TX 78702, USA',
        travelMode: 'DRIVING',
        waypoints: [
            {location: new google.maps.LatLng(30.098724, -97.752615), stopover:false},
            {location: new google.maps.LatLng(30.157336, -97.694960), stopover:false}
        ],
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            routeData = routeData.concat(parseRouteDetails(result));
            //directionsDisplay.setPanel(document.getElementById('panel'));
            //directionsDisplay.setDirections(result);
            updateTrafficDataDiv(routeData);
        }
    });
    var request = {
        origin: '2021 Genesta Dr, Buda, TX 78610, USA',
        destination: '1645 E 6th St #200, Austin, TX 78702, USA',
        travelMode: 'DRIVING',
        //waypoints: [{location: new google.maps.LatLng(30.208426, -97.756697), stopover:false}],
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            routeData = routeData.concat(parseRouteDetails(result));
            //directionsDisplay.setPanel(document.getElementById('panel'));
            //directionsDisplay.setDirections(result);
            updateTrafficDataDiv(routeData);
        }
    });
    //directionsDisplay.setMap(map);
    
    //Traffic Data
    var trafficDisplay = new google.maps.TrafficLayer();
    trafficDisplay.setMap(map);
}
//Parse Route Details
function parseRouteDetails(rawData){
    var routes = rawData.routes;
    var data = new Array;
    for(i = 0; i < routes.length; i++){
        var route = routes[i].legs;
        route = route.shift();
        data[i] = {
            summary:    routes[i].summary,
            length:     route.distance.text,
            duration:   route.duration.text,
            warnings:   routes[i].warnings
        };
    }
    return data;
}

function updateTrafficDataDiv(routeData){
    var htmlString;
    for(i = 0; i < routeData; i++){
        htmlString = htmlString.concat("one");
        $("#trafficDataDiv").html(htmlString);
    }
    
}
//***** END UTILITY FUNCTIONS *****//
