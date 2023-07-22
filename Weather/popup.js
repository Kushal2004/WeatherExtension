var loc  = document.getElementById('CurLoc');
var temp = document.getElementById('CurTemp');
var speed = document.getElementById('CurSpeed');
var humid = document.getElementById('CurHumid');
var cloud = document.getElementById('curcloud');
var predict = document.getElementById('CurPrediction');
var icon = document.getElementById('currtemp-icon');



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {

    var Lat=position.coords.latitude;
    var Long=position.coords.longitude;

//   x.innerHTML = "Latitude: " + Lat + 
//   "<br>Longitude: " + Long;

  SetLocation(Lat,Long);
  
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}


async function SetLocation(Lat,Long)
{
    const url = 'https://geocoding-by-api-ninjas.p.rapidapi.com/v1/reversegeocoding?lat='+Lat+'&lon='+Long;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '721a46d58emsh26855a8004249b8p1ea2b1jsnefe4e28e9b30',
		'X-RapidAPI-Host': 'geocoding-by-api-ninjas.p.rapidapi.com'
	}
};

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        var city=result[0].name; 
        console.log("city:"+city);
        loc.innerHTML=city;

        const url1 = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city;
        const options1 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '721a46d58emsh26855a8004249b8p1ea2b1jsnefe4e28e9b30',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };
         
        try {
            const response = await fetch(url1, options1);
            const result = await response.json();
            console.log(result);
            weatherPrediction(result);
        } catch (error) {
            console.error(error);
        }


    } catch (error) {
        console.error(error);
    }
}
getLocation();

function weatherPrediction(weatherData) {
    const cloudCover = weatherData.cloud_pct;
    const temperature = weatherData.temp;
    const feelsLike = weatherData.feels_like;
    const humidity = weatherData.humidity;
    const windSpeed = weatherData.wind_speed;

    console.log(
        cloudCover +" "+
        temperature +" "+
        feelsLike +" "+
        humidity +" "+
        windSpeed 
    )
    
    // Predictions based on the provided data
    let weatherPrediction = "";
  
    // Check for precipitation (rain, snow, etc.)
    if (cloudCover > 50) {
      weatherPrediction += "It's likely to be cloudy, ";
      if(humidity > 90)
      {
        weatherPrediction +="It is likely raining.";
        icon.src="./asserts/raining.svg";
      }
      else if (humidity > 70) {
        weatherPrediction += "and there is a chance of rain. ";
        icon.src="./asserts/rainy-3.svg"
      } else {
        weatherPrediction += "but rain is not expected. ";
        icon.src="./asserts/cloudy-day-2.svg"
      }
    } else {
      if (humidity > 60) {
        weatherPrediction += "It might be humid, ";
        icon.src="./asserts/cloudy.svg"
      } else {
        weatherPrediction += "Expect a sunny day. ";
        icon.src="./asserts/day.svg";
      }
    }
  
    // Check for strong wind conditions
    if (windSpeed > 7) {
      weatherPrediction += `Expect windy conditions with a wind speed of ${windSpeed} m/s. `;
    }
  
    // Check for temperature and "feels like" temperature
    if (feelsLike > temperature) {
      weatherPrediction += `It might feel warmer at ${feelsLike}°C. `;
    } else {
      weatherPrediction += `The temperature is ${temperature}°C. `;
    }
  
    //console.log(weatherPrediction);
    temp.innerHTML=temperature+"°";
    speed.innerHTML=windSpeed+" mph";
    humid.innerHTML=humidity+" %";
    cloud.innerHTML=cloudCover+"%";
    predict.innerHTML=weatherPrediction;
  }
  
  // Example usage with the provided weather data
//   const weatherData = {
//     cloud_pct: 97,
//     temp: 28,
//     feels_like: 32,
//     humidity: 80,
//     min_temp: 28,
//     max_temp: 28,
//     wind_speed: 5.08,
//     wind_degrees: 242,
//     sunrise: 1689897723,
//     sunset: 1689944676,
//   };
  

  