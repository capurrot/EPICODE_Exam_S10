import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Placeholder } from "react-bootstrap";
import { BsDropletHalf, BsWind } from "react-icons/bs";
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

  /* Imposto una immagine per ogni città segnata nella card da unsplash */
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
        if (myLatLon[0]?.local_names?.es === undefined) {
          setCityName(myLatLon[0]?.name || "Città non disponibile");
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
    } finally {
      setIsLoading(false);
    }
  };

  const convertToCelsius = (k) => {
    return k ? (k - 273.15).toFixed(1) : "";
  };

  /*Volevo impostare dei placeholder. Ora cerco di renderli più graficamente simili a quelle create con la fetch */
  return isLoading ? (
    <Card className="shadow-sm">
      <Placeholder as={Card.Img} style={{ height: "200px" }} />
      <Card.Body>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={10} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave"></Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={4} className="mx-auto d-block" style={{ height: "80px" }} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={4} className="mx-auto d-block" />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={6} className="mx-auto d-block" style={{ height: "80px" }} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={5} className="rounded" style={{ height: "128px" }} />
          <Placeholder xs={5} className="float-end rounded" style={{ height: "128px" }} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={12} className="rounded" style={{ height: "40px" }} />
        </Placeholder>
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
