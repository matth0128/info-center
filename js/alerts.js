//***** MAIN ROUTINE *****//
$(document).ready(function() {  
    //Alert Data
    //getAlerts();
    //setInterval(getAlerts, 300000); //Update the Alerts every 5 minutes.
    
    //Traffic Route Data
    //getTrafficRouteData(); //Get the traffic route data.
    //setInterval(getTrafficRouteData, 300000); //Update the every 5 minutes.    
});
//***** END MAIN ROUTINE *****//
//-----=====-----//
//***** FUNCTIONS *****//
//Get/Inject Alert Data
function getAlerts() {
    //Load Config Values
    configData = loadConfig();
    
    //----- ROAD CLOSURES -----//
    atxfloodsAPI = "https://www.atxfloods.com/dashboard/phpsqlajax_genxml.php";
    $.get(atxfloodsAPI).done(function(data) {
        console.log(data);
   });


}

//Get/Inject Traffic Route Data
function getTrafficRouteData() {
    //Load Config Values
    configData = loadConfig();

    //----- Traffic Route Data -----//
    var gMapsTrafficAPI = "http://maps.googleapis.com/maps/api/directions/json?units=imperial&origin=2021+Genesta+Dr,+Buda,+TX+78610-5106,+USA&destination=Front+Gate+Tickets,+1645+E+6th+St+%23200,+Austin,+TX+78702,+USA&mode=driving&alternatives=true&waypoints=via:30.098724,-97.752615|via:30.157336,%20-97.694960&language=en-ENhttps://maps.googleapis.com/maps/api/directions/json?units=imperial&origin=2021+Genesta+Dr,+Buda,+TX+78610-5106,+USA&destination=Front+Gate+Tickets,+1645+E+6th+St+%23200,+Austin,+TX+78702,+USA&mode=driving&alternatives=true&waypoints=via:30.098724,-97.752615|via:30.157336,%20-97.694960&language=en-EN&key=AIzaSyD6tdCDcWMz2BGO9AzvBhX5P0Uqw9n0S-g";
}
