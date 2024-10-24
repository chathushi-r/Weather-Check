import React from "react";
import { useState, useEffect } from "react";

//Weather display component
export default function WeatherCard(props){

    //Initialize state variable to manage weather data
    const[weatherData, setWeatherData] = useState({
        temp : "",
        icon: "",
        description: "",
        humidity: "",
        wind_kph:"",
        feelslike_c: "",
        forecastday: [{
            date: "",
            avgtemp_c: "",
            day_icon: ""
        }]
    })
    
    const[loadIcon, setLoadIcon] = useState(true)


    //add a side effect interact with the public weather api
    useEffect(function(){
        async function fetchWeatherData(){
            try{
                //fetch data from the https request
                const response = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=ef16ab0456214c64be074504241610&q=${props.city}&days=3&aqi=no&alerts=no`)
                //parse the response in json
                const data = await response.json()
                //assign the retrieved data to the weatherData object
                setWeatherData(function(prevWeatherData)  {
                    return(
                       { 
                            ...prevWeatherData,
                            temp: data.current.temp_c,
                            icon: data.current.condition.icon,
                            description: data.current.condition.text,
                            humidity: data.current.humidity,
                            wind_kph: data.current.wind_kph,
                            feelslike_c: data.current.feelslike_c,

                            forecastday: data.forecast.forecastday.map(function(dayItem){
                                return(
                                    {
                                        date: dayItem.date,
                                        avgtemp_c: dayItem.day.avgtemp_c,
                                        day_icon: dayItem.day.condition.icon
                                    }
                                )

                            })
                        }

                    )
                })
            }catch(error){
                console.log("Error: " + error)      //log any error
            }finally{
                //after data is received, the loading text should not be displayed
                setLoadIcon(false)
            }
        }
        fetchWeatherData()
    },[props.city])


    
    return(
        <div>
        {loadIcon ? (
            <div className="loading-text">Please wait...</div>
        ) : (
            <div className="weather-display">
                <h3 className="city-name">{props.city}</h3>
                <p className="temp">{weatherData.temp}</p>
                <img alt="weather-icon" className="weather-emoji" src={weatherData.icon}/>
                <p className="weather-desc">{weatherData.description}</p>
                <div className="other-details-display">
                    <div className="humidity-display">
                        <p className="humidity-value">{weatherData.humidity}%</p>
                        <p className="other-label">Humidity</p>
                    </div>
                    <div className="wind-display">
                        <p className="windspeed-value">{weatherData.wind_kph}kph</p>
                        <p className="other-label">Winds</p>
                    </div>
                    <div className="feels-like-display">
                        <p className="feels-like-value">{weatherData.feelslike_c}C</p>
                        <p className="other-label">Feels Like</p>
                    </div>
                </div>
                <hr className="line-break"></hr>
                <div className="show-forecast-display">
                    {
                    (weatherData.forecastday).map((day) => (
                            <div className="day-forecast">
                                <p className="date">{day.date}</p>
                                <img alt="weather-day-icon" className="day-emoji" src={day.day_icon}/>
                                <p className="day-temp">{day.avgtemp_c}</p>
                            </div>
                        ))

                    }
                </div>
           </div>
        )}
    </div>
        
    )

}



/** */