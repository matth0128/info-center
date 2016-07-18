//***** MAIN ROUTINE *****//
$(document).ready(function() {  
    getAlerts(); //Get the initial Alerts.
    setInterval(getAlerts, 300000); //Update the Alerts every 5 minutes.
});

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
//***** END MAIN ROUTINE *****//
//-----=====-----//
//***** UTILITIY FUNCTIONS *****//
