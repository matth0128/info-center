// ***** Function loadConfig() ***** //
function loadConfig(){
    var configData = {};
    //Google Maps API Key & Link
    configData.googleMap = {};
        configData.googleMap.APIKey = "YOUR API KEY";
        configData.googleMap.APILink = "https://maps.googleapis.com/maps/api/js?key="+configData.googleMap.APIKey+"&callback=initMap&signed_in=true";
        configData.googleMap.lat = 30.221048;
        configData.googleMap.lng = -97.754094;
        configData.googleMap.zoom = 11;


    //Weather Underground API Key
    configData.weather = {};
    configData.weather.wundergroundAPIKey = "YOUR API KEY";
        
    //Default Weather Location
    configData.weather.city = "Buda"; //City
    configData.weather.state = "TX"; //State Abbreivation

    //Return Data
    return configData;
}

// ***** Function getGoogleMapLink() ***** //
function getGoogleMapLink() {
    configData = loadConfig();
    return "https://maps.googleapis.com/maps/api/js?key="+configData.googleMap.APIKey+"&callback=initMap&signed_in=true";
}
