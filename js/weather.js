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
          $("#currentConditionsImage").html('<img src="'+weather.image+'">');
          //Inject Daylight Duration
          var sunrise = moment(weather.sunrise, "hh:mm A");
          var sunset = moment(weather.sunset, "hh:mm A");
          var duration = moment.duration(sunset.diff(sunrise));
          var duration_hour = Math.floor(duration.asHours());
          var duration_min = Math.floor(duration.asMinutes()) - (duration_hour * 60);
          var hours = duration_hour+"h "+duration_min+"m";
          $('#dayDuration').html(hours);
          //Inject Forecast Data
          var forecast_html;
          for(i = 0; i < weather.forecast.length; i++){
              forecast_data = weather.forecast[i];
              forecast_html = forecast_data.date+'<br>';
              forecast_html += forecast_data.day+'<br>';
              forecast_html += forecast_data.high+' /'+forecast_data.low+'<br>';
              forecast_html += '<img src="'+forecast_data.thumbnail+'"><br>';
              forecast_html += forecast_data.text;
              $('#forecast'+i).html(forecast_html);
          }
      },
      error: function(error) {
          $('#weather').html('<p>'+error+'</p>');
      }
    });
}
