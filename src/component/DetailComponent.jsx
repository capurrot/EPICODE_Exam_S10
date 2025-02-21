import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import DetailCard from "./DetailCard";

const DetailComponent = () => {
  const location = useLocation();
  const [cityName, setCityName] = useState("");
  const clientKeyOpenWeather = "3645d6cc7680ee79d5d7b340b121b16f";
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetchLatLon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname.slice(8).replace(/-/g, " ")]);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const fetchLatLon = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${[
          location.pathname.slice(8).replace(/-/g, " "),
        ]}&limit=1&appid=${clientKeyOpenWeather}`
      );
      if (resp.ok) {
        const myLatLon = await resp.json();
        if (myLatLon[0].local_names === undefined) {
          setCityName(myLatLon[0].name);
        } else if (myLatLon[0].local_names.it !== undefined) {
          setCityName(myLatLon[0].local_names.it);
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
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${clientKeyOpenWeather}`
      );
      if (resp.ok) {
        const myWeather = await resp.json();
        console.log(myWeather);

        const dayWeather = myWeather.list.filter((item) => item.dt_txt.includes("12:00:00"));
        setForecast(dayWeather);
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
    <Container fluid className="pt-5">
      <h3 className="display-5">
        {cityName}
        <span className="ps-2" style={{ fontSize: "1rem" }}>
          (Dettaglio del meteo della città - 5 giorni)
        </span>{" "}
      </h3>
      <Row xs={1} md={2} xl={5}>
        {forecast.length > 0 &&
          forecast.map((listItem, i) => (
            <Col key={i}>
              <DetailCard
                date={listItem.dt_txt}
                temperature={convertToCelsius(listItem.main.temp)}
                humidity={listItem.main.humidity}
                wind={listItem.wind.speed}
                icon={listItem.weather[0].icon}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default DetailComponent;
