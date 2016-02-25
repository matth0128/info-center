$(document).ready(function() {  
    getWeather(); //Get the initial weather.
    setInterval(getWeather, 300000); //Update the weather every 5 minutes.
});

function getWeather() {
    //Load Config Values
    configData = loadConfig();

    $.simpleWeather({
        location: configData.weather.location,
        unit: 'f',
        success: function(weather) {
            console.dir(weather);
            //Inject Weather Data
            $(".data-wx").each(function (){
                wxValue = $(this).attr('data-wx');
                $(this).html(weather[wxValue]);
            });
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
}
