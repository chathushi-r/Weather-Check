import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { faGaugeHigh } from "@fortawesome/free-solid-svg-icons";
//import HourForecastCard from "./HourForecastCard";

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
        pressure:"",
        forecastday: [{
            date: "",
            avgtemp_c: "",
            day_icon: "",
            hour: [{
                time:"",
                condition_icon: "",
                hour_temp_c: ""
            }]
        }]
    })

    const[loadIcon, setLoadIcon] = useState(true)
    const[showHourForecast,setShowHourForecast] = useState(false)
    const[hourForecastPerDay, setHourForecastPerDay] = useState([{
        hour_time: "",
        icon: "",
        temp:""
    }])

    function showHourlyForecastPerDay(hourInfo){
        console.log(hourInfo)
        setShowHourForecast(true)
        setHourForecastPerDay(function(prevHourForecast){
            hourInfo.map(function(hourItem){
                return(
                    {
                        ...prevHourForecast,
                        hour_time: hourItem.time,
                        icon: hourItem.condition_icon,
                        temp:hourItem.hour_temp_c
                    }
                )
            })
        })
    }

    function displayHourCard(){

    }



    //add a side effect to interact with the public weather api
    useEffect(function(){
        async function fetchWeatherData(){
            try{
                //fetch data from the https request
                const response = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=ef16ab0456214c64be074504241610&q=${props.city}&days=3&aqi=no&alerts=no`)
                //parse the response in json
                const data = await response.json()
                console.log(data)
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
                            pressure: data.current.pressure_mb,
                            forecastday: data.forecast.forecastday.map(function(dayItem){
                                return(
                                    {
                                        date: dayItem.date,
                                        avgtemp_c: dayItem.day.avgtemp_c,
                                        day_icon: dayItem.day.condition.icon,
                                        hour: dayItem.hour.map(function(hourItem){
                                            return(
                                                {
                                                    time: hourItem.time,
                                                    condition_icon: hourItem.condition.icon,
                                                    hour_temp_c: hourItem.temp_c

                                                }
                                            )

                                        })
                                    }
                                )

                            })
                        }

                    )
                })
            }catch(error){
                console.log("Error: " + error)      //log any error
            }finally{
                //the text (displaying the loading message) should not be displayed
                setLoadIcon(false)
            }
        }
        fetchWeatherData()
    },[props.city])


    
    return(
        <div>
        { (!showHourForecast && loadIcon) ? (
            <div className="loading-text">Please wait...</div>
        ) : (
            <div className="weather-display">
                <div className="city-desc-container">
                    <h3 className="city-name">{props.city}</h3>
                    <img alt="weather-icon" className="weather-emoji" src={weatherData.icon}/>
                    <p className="temp">{weatherData.temp}</p>
                </div>
                <p className="weather-desc">{weatherData.description}</p>
                <div className="other-details-display">
                    <div className="weather-parameters-display">
                        <div className="parameter-heading-container">
                            <FontAwesomeIcon className="parameter-icon" icon={faDroplet} />
                            <p className="other-label">Humidity</p>
                        </div>
                        <p className="parameter-value">{weatherData.humidity}%</p>
                    </div>
                    <div className="weather-parameters-display">
                        <div className="parameter-heading-container">
                            <FontAwesomeIcon className="parameter-icon" icon={faWind} />    
                            <p className="other-label">Winds</p>
                        </div>
                        <p className="parameter-value">{weatherData.wind_kph}kph</p>
                    </div>
                    <div className="weather-parameters-display">
                        <div className="parameter-heading-container">
                            <FontAwesomeIcon className="parameter-icon" icon={faTemperatureHalf} />   
                            <p className="other-label">Feels Like</p>
                        </div>
                        <p className="parameter-value">{weatherData.feelslike_c}C</p>
                    </div>
                    <div className="weather-parameters-display">
                        <div className="parameter-heading-container">
                            <FontAwesomeIcon className="parameter-icon" icon={faGaugeHigh} />  
                            <p className="other-label">Pressure</p>
                        </div>
                        <p className="parameter-value">{weatherData.pressure}mb</p>
                    </div>
                </div>
                <hr className="line-break"></hr>
                <div className="show-forecast-display">
                    {
                        (weatherData.forecastday).map((dayItem) => (
                                <div className="day-forecast" onClick={() => showHourlyForecastPerDay(dayItem.hour)}>
                                    <p className="date">{dayItem.date}</p>
                                    <img alt="weather-day-icon" className="day-emoji" src={dayItem.day_icon}/>
                                    <p className="day-temp">{dayItem.avgtemp_c}</p>
                                </div>
                            )
                        )
                    }
                </div>
           </div>
        )}
    </div>
        
    )

}



/** {showHourForecast && <HourForecastCard
            hourDetails = {hourForecast}    
        />}*/