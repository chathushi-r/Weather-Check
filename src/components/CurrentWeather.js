import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { faGaugeHigh } from "@fortawesome/free-solid-svg-icons";

//Current Weather Component
export default function CurrentWeather(props){
    return(
        <div className="weather-display">
            <div className="city-desc-container">
                <h3 className="city-name">{props.city}</h3>
                <img alt="weather-icon" className="weather-emoji" src={props.weatherData.icon}/>
                <p className="temp">{props.weatherData.temp}&deg;C</p>
            </div>
            <p className="weather-desc">{props.weatherData.description}</p>
            <div className="show-forecast-display">
                {
                    (props.weatherData.forecastday).map((dayItem) => (
                        <div key={dayItem.date} className="day-forecast" onClick={() => props.showHourlyForecastPerDay(dayItem.hour)}>
                            <p className="date">{dayItem.date}</p>
                            <img alt="weather-day-icon" className="day-emoji" src={dayItem.day_icon}/>
                            <p className="day-temp">{dayItem.avgtemp_c}&deg;C</p>
                        </div>
                        )
                    )
                }
            </div>
            <hr className="line-break"></hr>
            <div className="other-details-display">
                <div className="weather-parameters-display">
                    <div className="parameter-heading-container">
                        <FontAwesomeIcon className="parameter-icon" icon={faDroplet} />
                        <p className="other-label">Humidity</p>
                    </div>
                    <p className="parameter-value">{props.weatherData.humidity}%</p>
                </div>
                <div className="weather-parameters-display">
                    <div className="parameter-heading-container">
                        <FontAwesomeIcon className="parameter-icon" icon={faWind} />    
                        <p className="other-label">Winds</p>
                    </div>
                    <p className="parameter-value">{props.weatherData.wind_kph}kph</p>
                </div>
                <div className="weather-parameters-display">
                    <div className="parameter-heading-container">
                        <FontAwesomeIcon className="parameter-icon" icon={faTemperatureHalf} />   
                        <p className="other-label">Feels Like</p>
                    </div>
                    <p className="parameter-value">{props.weatherData.feelslike_c}&deg;C</p>
                </div>
                <div className="weather-parameters-display">
                    <div className="parameter-heading-container">
                        <FontAwesomeIcon className="parameter-icon" icon={faGaugeHigh} />  
                        <p className="other-label">Pressure</p>
                    </div>
                    <p className="parameter-value">{props.weatherData.pressure}mb</p>
                </div>
            </div>
        </div>
    )
}