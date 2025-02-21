import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import sun from "../assets/sun.png";
import fewClouds from "../assets/few_clouds.png";
import Clouds from "../assets/clouds.png";
import BrokenClouds from "../assets/broken_clouds.png";

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
            <img src={sun} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Soleggiato</span>
          </>
        );
      case "02d":
        return (
          <>
            <img src={fewClouds} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Poco nuvoloso</span>
          </>
        );
      case "03d":
        return (
          <>
            <img src={Clouds} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Nuvoloso</span>
          </>
        );
      case "03n":
        return (
          <>
            <img src={Clouds} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Nuvoloso</span>
          </>
        );
      case "04d":
        return (
          <>
            <img src={BrokenClouds} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Molto nuvoloso</span>
          </>
        );
      case "04n":
        return (
          <>
            <img src={BrokenClouds} alt="Weather Icon" className="d-flex mx-auto" width={100} />
            <span>Molto nuvoloso</span>
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
              ? forecast[0].dt_txt.slice(8, 10) +
                "/" +
                forecast[0].dt_txt.slice(5, 7) +
                "/" +
                forecast[0].dt_txt.slice(0, 4) +
                " ore " +
                forecast[0].dt_txt.slice(11, 16)
              : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[0].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[0].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[1].dt_txt.slice(8, 10) +
                "/" +
                forecast[1].dt_txt.slice(5, 7) +
                "/" +
                forecast[1].dt_txt.slice(0, 4) +
                " ore " +
                forecast[1].dt_txt.slice(11, 16)
              : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[1].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[1].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[2].dt_txt.slice(8, 10) +
                "/" +
                forecast[2].dt_txt.slice(5, 7) +
                "/" +
                forecast[2].dt_txt.slice(0, 4) +
                " ore " +
                forecast[2].dt_txt.slice(11, 16)
              : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[2].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[2].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[3].dt_txt.slice(8, 10) +
                "/" +
                forecast[3].dt_txt.slice(5, 7) +
                "/" +
                forecast[3].dt_txt.slice(0, 4) +
                " ore " +
                forecast[3].dt_txt.slice(11, 16)
              : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[3].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[3].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[4].dt_txt.slice(8, 10) +
                "/" +
                forecast[4].dt_txt.slice(5, 7) +
                "/" +
                forecast[4].dt_txt.slice(0, 4) +
                " ore " +
                forecast[4].dt_txt.slice(11, 16)
              : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[4].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[4].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[5].dt_txt.slice(8, 10) +
                "/" +
                forecast[5].dt_txt.slice(5, 7) +
                "/" +
                forecast[5].dt_txt.slice(0, 4) +
                " ore " +
                forecast[5].dt_txt.slice(11, 16)
              : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[5].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[5].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[6].dt_txt.slice(8, 10) +
                "/" +
                forecast[6].dt_txt.slice(5, 7) +
                "/" +
                forecast[6].dt_txt.slice(0, 4) +
                " ore " +
                forecast[6].dt_txt.slice(11, 16)
              : ""}
          </h3>
          <p>
            {forecast.length > 0 && myWeatherIcon(forecast[6].weather[0].icon)}
            {forecast.length > 0 && <span className="ps-2">{convertToCelsius(forecast[6].main.temp)} °C</span>}
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <h3>
            {forecast.length > 0
              ? forecast[7].dt_txt.slice(8, 10) +
                "/" +
                forecast[7].dt_txt.slice(5, 7) +
                "/" +
                forecast[7].dt_txt.slice(0, 4) +
                " ore " +
                forecast[7].dt_txt.slice(11, 16)
              : ""}
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
