// ***** Function loadConfig() ***** //
// This function will return the basic configuration values. //
function loadConfig(){
    var config_data = {};
    //Google Maps API Key & Link
    config_data.google_maps_api_key = "YOUR API KEY";
    config_data.google_maps_api_link = "https://maps.googleapis.com/maps/api/js?key="+config_data.google_maps_api_key+"&callback=initMap&signed_in=true";
        
    //Return Data
    return config_data;
}

// ***** Function getGoogleMapLink() ***** //
function getGoogleMapLink() {
    config_data = loadConfig();
    return "https://maps.googleapis.com/maps/api/js?key="+config_data.google_maps_api_key+"&callback=initMap&signed_in=true";
}
