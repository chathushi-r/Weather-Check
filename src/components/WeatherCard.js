import React from "react";

//Weather display component
export default function WeatherCard(props){

    /*let weatherData = [
        {date:"15/10", emoji:"",temp:"20C"},
        {date:"16/10", emoji:"",temp:"27C"},
        {date:"17/10", emoji:"",temp:"24C"},
        {date:"18/10", emoji:"",temp:"23C"},
        {date:"19/10", emoji:"",temp:"20C"}
    ]*/

    //const url ="https://pro.openweathermap.org/data/2.5/forecast/hourly?q=sydney&appid=03e543f10ebdff21293e18845982b67f"
    return(
        <div className="weather-display">
            <h3 className="city-name">{props.city}</h3>
            <p className="temp">28C</p>
            <p className="weather-emoji">☀</p>
            <p className="weather-desc">Clear skies</p>
            <div className="other-details-display">
                <div className="humidity-display">
                    <p className="humidity-value">86%</p>
                    <p className="other-label">Humidity</p>
                </div>
                <div className="wind-display">
                    <p className="windspeed-value">20mph</p>
                    <p className="other-label">Winds</p>
                </div>
                <div className="feels-like-display">
                    <p className="feels-like-value">86%</p>
                    <p className="other-label">Feels Like</p>
                </div>
            </div>
            <hr className="line-break"></hr>
                <div className="show-forecast-display">
                    {weatherData.map((weather,index) => (
                        <div className="day-forecast">
                            <p className="date">{weather.date}</p>
                            <p className="day-emoji">{weather.emoji}</p>
                            <p className="day-temp">{weather.temp}</p>
                        </div>
                        )) 
                    }
                </div>
        </div>
        
    )
}

