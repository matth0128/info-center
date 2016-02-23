$(document).ready(function() {  
  getWeather(); //Get the initial weather.
  setInterval(getWeather, 300000); //Update the weather every 5 minutes.
});

function getWeather() {
    //Load Config Values
    configData = loadConfig();
    
    //Current Timestamp
        var timestamp = moment(weather.updated);

    $.simpleWeather({
    location: configData.weather.location,
    unit: 'f',
    success: function(weather) {
      console.dir(weather);
      html = '<h3>'+weather.city+', '+weather.region+'</h3>';
      html += '<ul><li>'+weather.temp+'&deg;'+weather.units.temp+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.text+'</li></ul>';
      html += '<p class="weather-update">Weather updated at '+moment(timestamp).format('MM/DD/YY h:mma')+'</p>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
