import { useEffect, useState } from "react";
import sun from "../assets/sun.png";
import fewClouds from "../assets/few_clouds.png";
import Clouds from "../assets/clouds.png";
import BrokenClouds from "../assets/broken_clouds.png";
import { BsDropletHalf, BsWind } from "react-icons/bs";

import { Container } from "react-bootstrap";
import WeatherCarousel from "./WeatherCarousel";

const LocalWeather = () => {
  const [cityName, setCityName] = useState("");
  const clientKeyOpenWeather = "3645d6cc7680ee79d5d7b340b121b16f";
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [iconImg, setIconImg] = useState("");
  const [descWeather, setDescWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log("Il tuo browser non è supportato");
    }
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const fetchWeather = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${clientKeyOpenWeather}`
      );
      if (resp.ok) {
        const myWeather = await resp.json();

        const imgIcon = myWeather.weather[0].icon;

        setIconImg(`http://openweathermap.org/img/wn/${imgIcon}@2x.png`);
        setDescWeather(myWeather.weather[0].description);
        setTemperature(myWeather.main.temp);
        setHumidity(myWeather.main.humidity);
        setWind(myWeather.wind.speed);
        setCityName(myWeather.name);

        switch (imgIcon) {
          case "01n":
            setIconImg(sun);
            setDescWeather("Cielo limpido");
            break;
          case "01d":
            setIconImg(sun);
            setDescWeather("Cielo limpido");
            break;
          case "02d":
            setIconImg(fewClouds);
            setDescWeather("Poco nuvoloso");
            break;
          case "03d":
            setIconImg(Clouds);
            setDescWeather("Nuvoloso");
            break;
          case "03n":
            setIconImg(Clouds);
            setDescWeather("Nuvoloso");
            break;
          case "04d":
            setIconImg(BrokenClouds);
            setDescWeather("Molto nuvoloso");
            break;
          case "04n":
            setIconImg(BrokenClouds);
            setDescWeather("Molto nuvoloso");
            break;
          default:
            break;
        }
      } else {
        throw new Error("Errore nel recupero del meteo della città");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertToCelsius = (k) => {
    return k ? (k - 273.15).toFixed(1) : "";
  };

  return (
    <>
      <Container fluid className="mt-4">
        <h3 className="display-5">
          Meteo Attuale
          <span className="ps-2" style={{ fontSize: "1rem" }}>
            (posizione e orario locali)
          </span>
        </h3>
      </Container>

      <div className="mb-4 local d-block d-lg-flex flex-column text-center">
        <p className="pt-2 d-block d-lg-flex justify-content-between align-items-center">
          <span className="d-block d-lg-flex display-4 text-center">{cityName}</span>
          {iconImg && <img src={iconImg} alt="Weather Icon" className="d-flex mx-city" width={100} />}
          <span>{descWeather}</span>
          <span className="d-flex display-4 justify-content-center">{convertToCelsius(parseInt(temperature))} °C</span>
          <span className="d-flex flex-column align-items-center">
            <strong>Umidità</strong>
            <BsDropletHalf className="my-1" />
            {humidity} %
          </span>
          <span className="d-flex flex-column align-items-center">
            <strong>Vento</strong>
            <BsWind className="my-1" />
            {wind.toLocaleString("it-IT")} km/h
          </span>
        </p>
        <WeatherCarousel lat={lat} lon={lon} />
      </div>
    </>
  );
};

export default LocalWeather;
