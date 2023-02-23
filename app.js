

window.addEventListener("load" ,() => {

    let long;
    let lat;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>

        {
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d7b71f4756ad4b9d63d3cfdb046971f2`

            fetch(api).then((weather) =>{

                return weather.json();
            }).then(showWeatherreport);
        }
        
        )
    }
})