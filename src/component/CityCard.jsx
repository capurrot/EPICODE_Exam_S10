import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import sun from "../assets/sun.png";
import fewClouds from "../assets/few_clouds.png";
import Clouds from "../assets/clouds.png";
import BrokenClouds from "../assets/broken_clouds.png";
import Mist from "../assets/mist.png";
import { Placeholder } from "react-bootstrap";
import { BsDropletHalf, BsWind } from "react-icons/bs";
import { Link } from "react-router";

function CityCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [cityImg, setCityImg] = useState("");
  const clientIdUnsplash = "TDuWauWcYK23Pw5VM3uRIDN4sE5EsB6n1i_wxrHLZ7c";
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
    fetchImage();
    fetchLatLon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.city]);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const fetchImage = async () => {
    try {
      const resp = await fetch(
        `https://api.unsplash.com/search/photos?query=${props.city}&client_id=${clientIdUnsplash}`
      );
      if (resp.ok) {
        const imgCity = await resp.json();
        const indexImg = Math.floor(Math.random() * imgCity.results.length);
        setCityImg(imgCity.results[indexImg].urls.small);
      } else {
        throw new Error("Errore nel recupero dell'immagine della città");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLatLon = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${props.city},CO&limit=1&appid=${clientKeyOpenWeather}`
      );
      if (resp.ok) {
        const myLatLon = await resp.json();
        if (myLatLon[0].local_names === undefined) {
          setCityName(myLatLon[0].name);
        } else {
          setCityName(myLatLon[0].local_names.es);
        }
        setLat(myLatLon[0].lat);
        setLon(myLatLon[0].lon);
      } else {
        throw new Error("Errore nel recupero dell'immagine della città");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          case "50d":
            setIconImg(Mist);
            setDescWeather("Foschia o nebbia");
            break;
          default:
            break;
        }
      } else {
        throw new Error("Errore nel recupero del meteo della città");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertToCelsius = (k) => {
    return k ? (k - 273.15).toFixed(1) : "";
  };

  return isLoading ? (
    <Card className="shadow-sm">
      <Card.Body>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave"></Placeholder>
      </Card.Body>
    </Card>
  ) : (
    <Card className="citycard mb-3">
      {cityImg && <Card.Img variant="top" src={cityImg} className="imgcity" />}
      <Card.Body>
        <Card.Title className="yellowcolombia ">{cityName}</Card.Title>
        <Card.Text className="text-light text-center mb-0 iconweather">
          {iconImg && <img src={iconImg} alt="Weather Icon" className="d-flex mx-auto" width={100} />}
        </Card.Text>
        <Card.Text className="text-light text-center">{descWeather}</Card.Text>
        <Card.Text className="d-flex display-4 justify-content-center text-light mb-0">
          {convertToCelsius(parseInt(temperature))} °C
        </Card.Text>
        <Card.Text className="text-light d-flex justify-content-between text-center mt-4">
          <span className="humwind">
            <strong>Umidità</strong>
            <br />
            <BsDropletHalf className="my-3" />
            <br />
            {humidity} %
          </span>
          <span className="humwind">
            <strong>Vento</strong>
            <br />
            <BsWind className="my-3" />
            <br />
            {wind.toLocaleString("it-IT")} km/h
          </span>
        </Card.Text>
        {/* Codice trovato su stackoverflow per impostare lettere non accentate */}
        <Link
          to={`/detail/${cityName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="btn btncolombia w-100"
        >
          Vai al dettaglio del meteo
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CityCard;
