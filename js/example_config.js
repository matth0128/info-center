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
    
    //Default Weather Location ["City, ST"]
    configData.weather = {};
    configData.weather.location = "Buda, TX";

    //Return Data
    return configData;
}

// ***** Function getGoogleMapLink() ***** //
function getGoogleMapLink() {
    configData = loadConfig();
    return "https://maps.googleapis.com/maps/api/js?key="+configData.googleMap.APIKey+"&callback=initMap&signed_in=true";
}
