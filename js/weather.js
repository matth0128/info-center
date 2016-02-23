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
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.text+'</li></ul>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
