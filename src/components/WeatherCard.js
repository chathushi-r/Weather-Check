import React from "react";
import { useState, useEffect } from "react";
import HourForecast from "./HourForecast";
import CurrentWeather from "./CurrentWeather";

//Weather component
export default function WeatherCard(props){

    //Initialize state variables
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

    const[errorText, setErrorText] = useState(true)
    const[showHourForecast,setShowHourForecast] = useState(false)
    const[hourForecastPerDay, setHourForecastPerDay] = useState([{
        hour_time: "",
        icon: "",
        temp:""
    }])

    //when the user clicks on a day in the current weather, the system will set the hour details to that selected date
    function showHourlyForecastPerDay(hourInfo){
        //set show hour forecast as true to display the card
        setShowHourForecast(true)
        setHourForecastPerDay(function(prevHourForecast){
            return(
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
            )
        })
    }

    //when the user clicks the back button in the HourForecast card, the system will hide the HourForecast card
    function hideHourForecast(){
        setShowHourForecast(false)
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
                                        avgtemp_c: dayItem.day.avgtemp_c,
                                        day_icon: dayItem.day.condition.icon,
                                        hour: dayItem.hour.map(function(hourItem){
                                            return(
                                                {
                                                    date: dayItem.date,
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
                //the error message should not be displayed
                setErrorText(false)
            }
        }
        fetchWeatherData()
    },[props.city])

    //decides on what to display on the screen
    function displayWeatherContent(){
        if(showHourForecast){
            
            return(
                <HourForecast
                    hourForecast = {hourForecastPerDay}
                    hideHourForecast = {hideHourForecast}
                />
            )
        }else{
            return(
                <CurrentWeather
                    city = {props.city}
                    weatherData = {weatherData}
                    showHourlyForecastPerDay = {showHourlyForecastPerDay}
                />
            )
        }
    }

    return(
        <div>
            { 
                errorText ? (<div className="error-text">Please wait...</div>) : displayWeatherContent()
            }
        </div> 
    )

}

