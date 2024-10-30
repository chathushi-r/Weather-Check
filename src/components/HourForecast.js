import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";


//Hour Forecast component
export default function HourForecast(props){

    // format the time string to remove the date. (2024-10-8 00:00) is converted to (00:00)
    function formatTime(time){
        //retrieve the index of the first space in the time string
        const firstSpace = time.indexOf(" ")

        //if a space is found, return the rest of the string after the index of the first space
        if(firstSpace !== -1){
            return time.substring(firstSpace + 1)
        }else{
            return ""
        }
    }

    //break the array into 3 arrays to display in a 3 column layout
    const firstEightHours = props.hourForecast.slice(0,8)
    const nextEightHours = props.hourForecast.slice(8,16)
    const lastEightHours = props.hourForecast.slice(16,24)

    
    //hour forecast content that to be displayed on the screen
    function displayHourForecast(){
        return(
            <div className="hour-card-container">
                <div className="first-eight-hours-container">
                    {
                        firstEightHours.map((hourItem) => {
                            return (
                                <div key={hourItem.hour_time} className="hour-container">
                                    <div className="per-hour-container">
                                        <p className="hour-time">{formatTime(hourItem.hour_time)}</p>
                                        <img className="hour-icon" src={hourItem.icon} alt="hour-condition"/>
                                        <p className="hour-temp">{hourItem.temp}&deg;C</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="next-eight-hours-container">
                    {
                        nextEightHours.map((hourItem) => {
                            return (
                                <div key={hourItem.hour_time} className="hour-container">
                                    <div className="per-hour-container">
                                        <p className="hour-time">{formatTime(hourItem.hour_time)}</p>
                                        <img className="hour-icon" src={hourItem.icon} alt="hour-condition"/>
                                        <p className="hour-temp">{hourItem.temp}&deg;C</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="last-eight-hours-container">
                    {
                        lastEightHours.map((hourItem) => {
                            return (
                                <div key={hourItem.hour_time} className="hour-container">
                                    <div className="per-hour-container">
                                        <p className="hour-time">{formatTime(hourItem.hour_time)}</p>
                                        <img className="hour-icon" src={hourItem.icon} alt="hour-condition"/>
                                        <p className="hour-temp">{hourItem.temp}&deg;C</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>           
            </div>
        )
    }

    return(
        <div className="forecast-container">
            <div className="forecast-heading-container">
                <h3 className="forecast-heading">24 Hour Forecast</h3>
                <button className="go-back-btn" onClick={props.hideHourForecast}><FontAwesomeIcon className="back-icon" icon={faBackward} />Back</button>
            </div>
            <hr className="forecast-line-break"/>
            { (props.hourForecast !== null) ? displayHourForecast() : <p>No hourly forecast available!</p>}
        </div>
    )
}