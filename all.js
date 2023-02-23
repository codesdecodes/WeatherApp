// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "d7b71f4756ad4b9d63d3cfdb046971f2",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}


const searchInputBox = document.getElementById('input-box');





//start

window.addEventListener("load" ,() => {

    let long;
    let lat;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>

        {
            long=position.coords.longitude;
            lat=position.coords.latitude;

           
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=d7b71f4756ad4b9d63d3cfdb046971f2`

            fetch(api).then((weather) =>{

                return weather.json();
            }).then(showWeatherreport);

            document.querySelector('.weather-body').style.display = "block";
        }
        
        )
    }
})

(searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13)
    {
        console.log(searchInputBox.value);
        getWeatherReort(searchInputBox.value);

        document.querySelector('.weather-body').style.display = "block";
    }
})
)


    function getWeatherReort (city) 
    {
        fetch(`${weatherApi.baseurl}weather?q=${city}&units=metric&appid=${weatherApi.key}`)
          .then(weather => {
            return weather.json();
          }).then(showWeatherreport);
    }


function showWeatherreport(weather){
    console.log(weather);


    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

   let temperature = document.getElementById('tmp');
   temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;c`;

    let MinMaxtemp = document.getElementById('min-max');
    MinMaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;c (min) / ${Math.ceil(weather.main.temp_max)}&deg;c (max)`;


    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);


    if(weatherType.textContent == 'Clear')
    {
        document.body.style.backgroundImage = "url('WeatherIMG/Clear.jpg')"
    }
    else if(weatherType.textContent == 'Clouds')
    {
        document.body.style.backgroundImage = "url('WeatherIMG/Clouds.jpg')"
    }
    else if(weatherType.textContent == 'Haze')
    {
        document.body.style.backgroundImage = "url('WeatherIMG/Haze.jpg')"
    }
    else if(weatherType.textContent == 'Rain')
    {
        document.body.style.backgroundImage = "url('WeatherIMG/Rain.jpg')"
    }
    else if(weatherType.textContent == 'Thunderstorm')
    {
        document.body.style.backgroundImage = "url('WeatherIMG/Thunderstorm.jpg')"
    }


}

function dateManage(dateArg){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let year = dateArg.getFullYear();

    let month = months[dateArg.getMonth()];

    let date = dateArg.getDate();

    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;

}