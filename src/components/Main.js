import React from "react";
import CountryData from "./countries"
import WeatherCard from "./WeatherCard";
import { useState } from "react";

//Main Component
export default function Main(){
    const countryList = CountryData.countryInfo.countries
    const [cityList, setCityList] = useState([])
    const [showWeather, setShowWeather] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const[showHeadings, setShowHeadings] = useState(true)

    //to control the state of form data
    const[formData, setFormData] = useState({
        country: "",
        city: ""
    })

    //function to handle changes in country and city inputs
    function handleInputChange(event){
        const {name,value} = event.target
        setFormData(prevFormData => {
            return({
                ...prevFormData,
                [name]:value

            })
        }) 
    }

    //function to populate the city select box once a country is selected
    function updateCityList(){
        countryList.forEach(function(country){
            if(formData.country === country.name){
                const cityUpdatedList= country.cities
                setCityList(cityUpdatedList)
            }
        })
    }

    //function to handle form submission
    function handleSubmit(e){
        e.preventDefault()
        if(formData.country !== "" && formData.city !== ""){
            setShowWeather(true)        //will display weather details
            setShowHeadings(false)      //remove the main headings
        }else{
            setShowWeather(false)   //set showWeather as false since no country/city selected
            setShowHeadings(false)  //if a country/city is not selected, the headings will remain on the screen
            setErrorMsg(true)       //display an error message if the user clicks the submit button
        }

    }

    //function to display weather details once a country/city is selected
    function showWeatherComponent(){
        if(showWeather){
            return(
                //call the weathercard component
                <WeatherCard
                    city = {formData.city}
                    country = {formData.country}
                />
            )
        }else{
            if(errorMsg){
                return(
                    <p className="errorMsg">Please select a country and a city!</p>
                )
            } 
        }
    }
    
    return(
        <div className="main">
            <div className="country-city-input">
                <h1 className="main--title--top">Select your country.</h1>
                <h1 className="main--title--bottom">Select your city.</h1>
                <form className="weather-form" onSubmit={handleSubmit}>
                    <div className="weather-input">
                        <div>
                            <select className="country" name="country" value={formData.country} onChange={handleInputChange}>
                                <option value="">Select a country</option>
                                {countryList.map((country, index)=>(
                                    <option key={index} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="city" name="city" onMouseOver={updateCityList} onChange={handleInputChange} value={formData.city}>
                                <option value="">Select a city</option>
                                {cityList.map((city, index)=>(
                                    <option key={index} value={city}>{city}</option>
                                ))}           
                            </select>   
                        </div>
                    </div>
                    <button className="weather-check-btn">Check Weather</button>
                </form>
                <h3 className="api--credit">Powered by WeatherAPI</h3>
             </div>
             <div className="weather-display-card">
                {
                    showHeadings ? (<>
                        <h2 className="main-desc">WeatherCheck</h2>
                        <h3 className="main-desc-sub">Check the current weather anytime, anywhere with WeatherCheck.</h3></>) : showWeatherComponent()
                }
             </div>
        </div>
        
    )
}

