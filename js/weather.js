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
          $('.data-wx').each(function (){
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
          $("#currentConditionsIcon").addClass(convertYahooWeatherCode(weather.code));
          //Inject Daylight Duration
          var sunrise = moment(weather.sunrise, "hh:mm A");
          var sunset = moment(weather.sunset, "hh:mm A");
          var duration = moment.duration(sunset.diff(sunrise));
          var duration_hour = Math.floor(duration.asHours());
          var duration_min = Math.floor(duration.asMinutes()) - (duration_hour * 60);
          var hours = duration_hour+"h "+duration_min+"m";
          $('#dayDuration').html(hours);
          //Inject Wind Speed/Direction Icon
          var wind_direction = weather.wind.direction.toLowerCase();
          $("#windSpeedDirection").addClass("wi-towards-"+wind_direction);
          //Inject Forecast Data
          var forecast_html;
          for(i = 0; i < weather.forecast.length; i++){
              forecast_data = weather.forecast[i];
              forecast_html = forecast_data.date+'<br>';
              forecast_html += forecast_data.day+'<br>';
              forecast_html += forecast_data.high+' /'+forecast_data.low+'<br>';
              forecast_html += '<i class="wi '+convertYahooWeatherCode(forecast_data.code)+'"></i><br>';
              forecast_html += forecast_data.text;
              $('#forecast'+i).html(forecast_html);
          }
      },
      error: function(error) {
          $('#weather').html('<p>'+error+'</p>');
      }
    });
}

// Conver Yahoo Weather Code
//***** Convert the Yahoo Weather API code to the corresponding Weather Icon. *****
function convertYahooWeatherCode(code) {
    switch(code){
        case "0": return "wi-tornado"; //tornado
        case "1": return "wi-hurricane"; //tropical storm 
        case "2": return "wi-hurricane"; //hurricane
        case "3": return "wi-thunderstorm"; //severe thunderstorms
        case "4": return "wi-storm-showers"; //thunderstorm
        case "5": return "wi-rain-mix"; //mixed rain and snow
        case "6": return "wi-rain-mix"; //mixed rain and sleet
        case "7": return "wi-rain-mix"; //mixed snow and sleet
        case "8": return "wi-rain-mix"; //freezing drizzle
        case "9": return "wi-sprinkle"; //drizzle
        case "10": return "wi-windy"; //freezing rain
        case "11": return "wi-showers"; //showsers
        case "12": return "wi-showers"; //showsers
        case "13": return "wi-snow"; //snow flurries
        case "14": return "wi-snow"; //light snow showers
        case "15": return "wi-snow-wind"; //blowing snow
        case "16": return "wi-snow"; //snow
        case "17": return "wi-hail"; //hail
        case "18": return "wi-sleet"; //sleet
        case "19": return "wi-dust"; //dust
        case "20": return "wi-fog"; //foggy
        case "21": return "wi-dust"; //haze
        case "22": return "wi-smoke"; //smoke
        case "23": return "wi-strong-wind"; //blustery
        case "24": return "wi-strong-wind"; //windy
        case "25": return "wi-snowflake-cold"; //cold
        case "26": return "wi-cloudy"; //cloudy
        case "27": return "wi-night-alt-cloudy"; //mostly cloudy (night)
        case "28": return "wi-day-cloudy"; //mostly cloudy (day)
        case "29": return "wi-night-alt-cloudy"; //partly cloudy (night)
        case "30": return "wi-day-cloudy"; //partly cloudy (day)
        case "31": return "wi-night-clear"; //clear (night)
        case "32": return "wi-day-sunny"; //sunny
        case "33": return "wi-night-clear"; //fair (night)
        case "34": return "wi-day-sunny"; //fair (day)
        case "35": return "wi-hail"; //mixed rain and hail
        case "36": return "wi-day-sunny"; //hot
        case "37": return "wi-thunderstorm"; //isolated thunderstorms
        case "38": return "wi-storm-showers"; //scattered thunderstorms
        case "39": return "wi-storm-showers"; //scattered thunderstorms
        case "40": return "wi-showers"; //scattered showers
        case "41": return "wi-snow"; //heavy snow
        case "42": return "wi-snow"; //scattered show showers
        case "43": return "wi-snow"; //heavy snow
        case "44": return "wi-cloudy"; //partly cloudy
        case "45": return "wi-stom-showers"; //thundershowers
        case "46": return "wi-snow"; //snow showers
        case "47": return "wi-storm-showers"; //isolated thundershowers
        case "3200": return "wi-na"; //not available
        default: return "wi-na";
    }
}
