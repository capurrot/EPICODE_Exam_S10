import { useEffect, useState } from "react";
import { BsDropletHalf, BsWind } from "react-icons/bs";
import WeatherCarousel from "./WeatherCarousel";
import { Container } from "react-bootstrap";
import CityCardList from "./CityCardList";
import { Link } from "react-router";
import i01n from "../assets/01n.png";
import i01d from "../assets/01d.png";
import i02n from "../assets/02n.png";
import i02d from "../assets/02d.png";
import i03n from "../assets/03d.png";
import i03d from "../assets/03d.png";
import i04n from "../assets/04d.png";
import i04d from "../assets/04d.png";
import i09n from "../assets/09d.png";
import i09d from "../assets/09d.png";
import i10n from "../assets/10d.png";
import i10d from "../assets/10d.png";
import i11n from "../assets/11d.png";
import i11d from "../assets/11d.png";
import i13n from "../assets/13d.png";
import i13d from "../assets/13d.png";
import i50n from "../assets/50d.png";
import i50d from "../assets/50d.png";

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
        if (myWeather?.local_names?.it === undefined) {
          setCityName(myWeather?.name || "Città non disponibile");
        } else {
          setCityName(myWeather.local_names.it);
        }
        /*Volevo fare le icone diverse sia per giorno che per notte ma il tempo non era abbastanza e così le 
        ho lasciato solo quello del giorno */

        switch (imgIcon) {
          case "01n":
            setIconImg(i01n);
            setDescWeather("Cielo sereno");
            break;
          case "01d":
            setIconImg(i01d);
            setDescWeather("Cielo sereno");
            break;
          case "02n":
            setIconImg(i02n);
            setDescWeather("Poco nuvoloso");
            break;
          case "02d":
            setIconImg(i02d);
            setDescWeather("Poco nuvoloso");
            break;
          case "03n":
            setIconImg(i03n);
            setDescWeather("Nuvoloso sparso");
            break;
          case "03d":
            setIconImg(i03d);
            setDescWeather("Nuvoloso sparso");
            break;
          case "04n":
            setIconImg(i04n);
            setDescWeather("Molto nuvoloso");
            break;
          case "04d":
            setIconImg(i04d);
            setDescWeather("Molto nuvoloso");
            break;
          case "09n":
            setIconImg(i09n);
            setDescWeather("Pioggia a tratti");
            break;
          case "09d":
            setIconImg(i09d);
            setDescWeather("Pioggia a tratti");
            break;
          case "10n":
            setIconImg(i10n);
            setDescWeather("Pioggia");
            break;
          case "10d":
            setIconImg(i10d);
            setDescWeather("Pioggia");
            break;
          case "11n":
            setIconImg(i11n);
            setDescWeather("Temporale");
            break;
          case "11d":
            setIconImg(i11d);
            setDescWeather("Temporale");
            break;
          case "13n":
            setIconImg(i13n);
            setDescWeather("Neve");
            break;
          case "13d":
            setIconImg(i13d);
            setDescWeather("Neve");
            break;

          case "50n":
            setIconImg(i50n);
            setDescWeather("Nebbia");
            break;
          case "50d":
            setIconImg(i50d);
            setDescWeather("Nebbia");
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
      <Container fluid className="pt-5">
        <h3 className="display-5">
          Meteo Locale
          <span className="ps-2 d-none d-lg-inline" style={{ fontSize: "1rem" }}>
            (posizione recuperata dal browser e orario locale)
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
        <Link className="text-end mb-3 linktodetail" to={`/detail/${cityName.toLowerCase().replace(/\s+/g, "-")}`}>
          Vai al dettaglio del meteo
        </Link>
      </div>
      <CityCardList />
    </>
  );
};

export default LocalWeather;
