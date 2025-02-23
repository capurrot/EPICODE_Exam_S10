import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
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

function WeatherCarousel(props) {
  const clientKeyOpenWeather = "3645d6cc7680ee79d5d7b340b121b16f";
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (props.lat !== null && props.lon !== null) {
      fetchForecast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.lat, props.lon]);

  const fetchForecast = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=${clientKeyOpenWeather}`
      );
      if (resp.ok) {
        const myForecast = await resp.json();
        setForecast(myForecast.list);
      } else {
        throw new Error("Errore nel recupero dei dati meteo Forecast");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const myWeatherIcon = (imgIcon) => {
    switch (imgIcon) {
      case "01n":
        return (
          <>
            <img src={i01n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Cielo sereno</span>
          </>
        );
      case "01d":
        return (
          <>
            <img src={i01d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Cielo sereno</span>
          </>
        );
      case "02n":
        return (
          <>
            <img src={i02n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Poco nuvoloso</span>
          </>
        );
      case "02d":
        return (
          <>
            <img src={i02d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Poco nuvoloso</span>
          </>
        );
      case "03n":
        return (
          <>
            <img src={i03n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Nuvoloso sparso</span>
          </>
        );
      case "03d":
        return (
          <>
            <img src={i03d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Nuvoloso sparso</span>
          </>
        );
      case "04n":
        return (
          <>
            <img src={i04n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Molto nuvoloso</span>
          </>
        );
      case "04d":
        return (
          <>
            <img src={i04d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Molto nuvoloso</span>
          </>
        );
      case "09n":
        return (
          <>
            <img src={i09n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Pioggia a tratti</span>
          </>
        );
      case "09d":
        return (
          <>
            <img src={i09d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Pioggia a tratti</span>
          </>
        );
      case "10n":
        return (
          <>
            <img src={i10n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Pioggia</span>
          </>
        );
      case "10d":
        return (
          <>
            <img src={i10d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Pioggia</span>
          </>
        );
      case "11n":
        return (
          <>
            <img src={i11n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Temporale</span>
          </>
        );
      case "11d":
        return (
          <>
            <img src={i11d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Temporale</span>
          </>
        );
      case "13n":
        return (
          <>
            <img src={i13n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Neve</span>
          </>
        );
      case "13d":
        return (
          <>
            <img src={i13d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Neve</span>
          </>
        );
      case "50n":
        return (
          <>
            <img src={i50n} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Nebbia</span>
          </>
        );
      case "50d":
        return (
          <>
            <img src={i50d} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Nebbia</span>
          </>
        );
      default:
        return <span>Icona non disponibile</span>;
    }
  };

  const convertToCelsius = (k) => {
    return k ? (k - 273.15).toFixed(1) : "";
  };

  return (
    <>
      <h2 className="border-top pt-2">Le prossime 24 ore</h2>
      <Carousel className="mt-2" style={{ height: "200px" }}>
        <Carousel.Item interval={10000}>
          <h3>
            {forecast.length > 0
              ? forecast[0].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[0].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[0].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[0].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[1].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[1].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[1].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[1].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[2].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[2].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[2].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[2].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[3].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[3].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[3].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[3].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[4].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[4].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[4].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[4].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[5].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[5].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[5].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[5].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[6].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[6].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[6].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[6].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[7].dt_txt.slice(8, 10) === String(new Date().getDate())
                ? "oggi"
                : "domani"
              : ""}
            {forecast.length > 0 ? " alle " + forecast[7].dt_txt.slice(11, 16) : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[7].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[7].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default WeatherCarousel;
