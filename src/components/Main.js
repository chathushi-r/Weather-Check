import React from "react";
import CountryData from "./countries"
import WeatherCard from "./WeatherCard";
import { useState } from "react";

//Main Component
export default function Main(){

    //Initialize state variables
    const countryList = CountryData.countryInfo.countries
    const [cityList, setCityList] = useState([])
    const [showWeather, setShowWeather] = useState(false)
    const[showHeadings, setShowHeadings] = useState(true)
    const[showNewLocationBtn, setShowNewLocationBtn] = useState(false)
    const[disableInputs, setDisableInputs] = useState(false)
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
    function handleFormSubmit(e){
        e.preventDefault()
        setShowWeather(true)        //will display weather details
        setShowHeadings(false)      //remove the main headings
        setShowNewLocationBtn(true)
        setDisableInputs(true)
    }

    //function to display weather details once a country/city is selected
    function showWeatherComponent(){
        if(showWeather){
            return(
                //call the weathercard component
                <WeatherCard
                    key=""
                    city = {formData.city}
                    country = {formData.country}
                />
            )
        }
    }

    //function to change state of displaying the location button, enabling inputs, clearing form data, hide current location weather details, re-display main headings
    function handleCheckNewLocationClick(){
        setShowNewLocationBtn(false)
        setDisableInputs(false)
        setFormData({country: "", city: ""})
        setShowWeather(false)
        setShowHeadings(true)
    }
    
    return(
        <div className="main">
            <div className="country-city-input">
                <div className="main-headings">
                    <h1 className="main--title--top">Select your country.</h1>
                    <h1 className="main--title--bottom">Select your city.</h1>
                </div>
                <form className="weather-form" onSubmit={handleFormSubmit}>
                    <div className="weather-input">
                        <div>
                            <select className="country" name="country" value={formData.country} onChange={handleInputChange} disabled={disableInputs ? true : false}> 
                                <option value="">Select a country</option>
                                {countryList.map((country, index)=>(
                                    <option key={index} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="city" name="city" onMouseOver={updateCityList} onChange={handleInputChange} value={formData.city} disabled={disableInputs || (formData.country === "") ? true : false}>
                                <option value="">Select a city</option>
                                {cityList.map((city, index)=>(
                                    <option key={index} value={city}>{city}</option>
                                ))}           
                            </select>   
                        </div>
                    </div>
                    <button className="weather-check-btn" disabled={ disableInputs || ((formData.city && formData.country) === "") ? true : false }>Check Weather</button>
                </form>
                {showNewLocationBtn && <button className="check-new-location-btn" onClick={handleCheckNewLocationClick}>Check New Location</button>}
                <h3 className="api--credit">Powered by <a className="api--credit" href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></h3>
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

