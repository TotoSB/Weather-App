import { useState, useEffect } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from './weatherApp.module.css'
import Loading from "./Loading";

export default function WeatherApp() {

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = `Weather | ${weather?.location.name ?? ''}`
    }, [weather]);

    async function loadInfo(city = "London") {
        try {
            const request = await fetch(`${process.env.REACT_APP_URL}${process.env.REACT_APP_KEY}&q=${city}&aqi=no`)

            const json = await request.json();

            setWeather(json);

        }
        catch(error) {

        }
    }

    function handleChangeCity(city) {
        setWeather(null)
        loadInfo(city)
    }

    return <div className={styles.weatherContainer}>
        <h1>Weather</h1>
        <WeatherForm onChangeCity={handleChangeCity}></WeatherForm>
        {weather ? <WeatherMainInfo weather={weather}/> : <Loading></Loading>}

    </div>
}
