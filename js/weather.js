//***** MAIN ROUTINE *****//
$(document).ready(function() {  
    getWeather(); //Get the initial weather.
    setInterval(getWeather, 300000); //Update the weather every 5 minutes.
});

//Get/Inject Weather Data
function getWeather() {
    //Load Config Values
    configData = loadConfig();

    //----- WEATHER -----//
    var wundergroundAPI = "http://api.wunderground.com/api/"+configData.weather.wundergroundAPIKey+"/conditions/q/"+configData.weather.state+"/"+configData.weather.city+".json";
    $.getJSON(wundergroundAPI).done(function(data) {               
        weather = normalizeWeatherData(data.current_observation);
        //console.dir(weather);
        //Inject Weather Data
        $('.data-wx').each(function () {
            wxValue = $(this).attr('data-wx');
            if(wxValue.indexOf('.') >= 0){
                var value = weather;
                var strings = wxValue.split('.');
                for(i = 0; i < strings.length; i++){
                    value = value[strings[i]];
                }
                $(this).html(value);
            }else{
                $(this).html(weather[wxValue]);
            }
        });
        //Inject Current Conditions Image
        $("#current-conditions-icon").html("<img src='"+convertWeatherIconLink(weather.icon_url)+"'/>");
        //Inject Wind Speed/Direction Icon
        var wind_direction = weather.wind_dir.toLowerCase();
        $("#wind-speed-direction").addClass("wi-towards-"+wind_direction);
        //Inject Pressure Rising/Steady/Falling Icon
        $("#pressure-state").addClass(convertBarometerCode(weather.pressure_trend));
    });

    //----- ASTRONOMY -----//
    wundergroundAPI = "http://api.wunderground.com/api/"+configData.weather.wundergroundAPIKey+"/astronomy/q/"+configData.weather.state+"/"+configData.weather.city+".json";
   $.getJSON(wundergroundAPI).done(function(data) {
        //console.log(data);
        var solar = data.sun_phase;
        var lunar = data.moon_phase;
        //Get Sunrise/Sunset Timestamps
        //Inject Sunrize/Sunset
        var sunrise = moment(solar.sunrise.hour+":"+solar.sunrise.minute, "HH:mm");
        var sunset = moment(solar.sunset.hour+":"+solar.sunset.minute, "HH:mm");
        //Inject Sunrize/Sunset
        $("#sunrise").html(moment(sunrise).format("hh:mm A"));
        $("#sunset").html(moment(sunset).format("hh:mm A"));
        //Inject Daylight Duration
        var duration = moment.duration(sunset.diff(sunrise));
        var duration_hour = Math.floor(duration.asHours());
        var duration_min = Math.floor(duration.asMinutes()) - (duration_hour * 60);
        var hours = duration_hour+"h "+duration_min+"m";
        $('#day-duration').html(hours);        
   });

   //----- FORECAST -----//
    wundergroundAPI = "http://api.wunderground.com/api/"+configData.weather.wundergroundAPIKey+"/forecast/q/"+configData.weather.state+"/"+configData.weather.city+".json";
    $.getJSON(wundergroundAPI).done(function(data){
        //console.dir(data);
        var forecast = data.forecast.simpleforecast.forecastday;
        //Inject Day Forecast Data
        var day_forecast = forecast.shift();
        $("#high_temp").html(day_forecast.high.fahrenheit);
        $("#low_temp").html(day_forecast.low.fahrenheit);
        //Inject Future Forecast Data
        var forecast_html;
        var forecast_data;
        for(i = 0; i < forecast.length; i++) {
            forecast_data = forecast[i];
            forecast_html = forecast_data.date.monthname_short+" "+forecast_data.date.day+"<br>";
            forecast_html = forecast_data.date.weekday+"<br>";
            forecast_html += forecast_data.high.fahrenheit+" /"+forecast_data.low.fahrenheit+"<br>";
            forecast_html += "<i class='wi "+convertWeatherConditionIconCode(forecast_data.icon)+"'></i><br>";
            forecast_html += forecast_data.conditions;
            $("#forecast"+i).html(forecast_html);
        }        
    });   
}
//***** END MAIN ROUTINE *****//
//-----=====-----//
//***** UTILITIY FUNCTIONS *****//
//Convert/Normalize Specific Values for Display
function normalizeWeatherData(data){
    //Strip Decimal from tempature value
    data.temp = parseInt(data.temp_f);
    //Normalize Wind Direction String
    switch(data.wind_dir) {
        case "North": data.wind_dir = "N";
        case "South": data.wind_dir = "S";
        case "East": data.wind_dir = "E";
        case "West": data.wind_dir = "W";
    }
    return data;
}

//Convert Yahoo Pressure Code Rising/Steady/Falling
function convertBarometerCode(code) {
    switch(code) {
        case "0": return "wi-direction-left";
        case "+": return "wi-direction-up";
        case "-": return "wi-directio-down";
        default: return "wi-na";
    }    
}

//Convert the Icon Link to the Desired Icon Set
function convertWeatherIconLink(link) {
    var icon = link.split("/").pop();
    return "http://icons.wxug.com/i/c/j/"+icon;
}

// Conver Weather Condition Code
//***** Convert the Weather Underground API condition code to the corresponding Weather Icon. *****
function convertWeatherConditionIconCode(code) {
    switch(code){
        //Day Icon Codes
        case "chanceflurries": return "wi-day-snow";
        case "chancerain": return "wi-day-showers";
        case "chancesleet": return "wi-day-sleet";
        case "chancesnow": return "wi-day-snow";
        case "chancetstorms": return "wi-day-thunderstorm";
        case "clear": return "wi-day-sunny";
        case "cloudy": return "wi-cloud";
        case "flurries": return "wi-snow";
        case "fog": return "wi-day-fog";
        case "hazy": return "wi-windy";
        case "mostlycloudy": return "wi-day-cloudy";
        case "mostlysunny": return "wi-day-cloudy-high";
        case "partlysunny": return "wi-day-cloudy-high";
        case "partlycloudy": return "wi-day-cloudy";
        case "sleet": return "wi-sleet";
        case "rain": return "wi-rain";
        case "snow": return "wi-snow";
        case "sunny": return "wi-day-sunny";
        case "tstorms": return "wi-thunderstorm";
        //Night Icon Codes
        case "nt_chanceflurries": return "wi-night-snow";
        case "nt_chancerain": return "wi-night-showers";
        case "nt_chancesleet": return "wi-night-sleet";
        case "nt_chancesnow": return "wi-night-snow";
        case "nt_chancetstorms": return "wi-night-thunderstorm";
        case "nt_clear": return "wi-night-sunny";
        case "nt_cloudy": return "wi-cloud";
        case "nt_flurries": return "wi-snow";
        case "nt_fog": return "wi-day-fog";
        case "nt_hazy": return "wi-windy";
        case "nt_mostlycloudy": return "wi-night-cloudy";
        case "nt_mostlysunny": return "wi-night-cloudy-high";
        case "nt_partlysunny": return "wi-night-cloudy-high";
        case "nt_partlycloudy": return "wi-night-cloudy";
        case "nt_sleet": return "wi-sleet";
        case "nt_rain": return "wi-rain";
        case "nt_snow": return "wi-snow";
        case "nt_sunny": return "wi-day-sunny";
        case "nt_tstorms": return "wi-thunderstorm";         
        //Default
        default: return "wi-na";
    }
}
//***** END UTILITY FUNCTIONS *****//
