import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import i01n from "../assets/01d.png";
import i01d from "../assets/01d.png";
import i02n from "../assets/02d.png";
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

const ModalComponent = ({ show, onHide, hourlyWeather, date, giorno }) => {
  const convertToCelsius = (k) => {
    return k ? (k - 273.15).toFixed(1) : "";
  };

  const myWeatherIcon = (imgIcon) => {
    switch (imgIcon) {
      case "01n":
        return (
          <>
            <img src={i01n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Cielo sereno</span>
          </>
        );
      case "01d":
        return (
          <>
            <img src={i01d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Cielo sereno</span>
          </>
        );
      case "02n":
        return (
          <>
            <img src={i02n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Poco nuvoloso</span>
          </>
        );
      case "02d":
        return (
          <>
            <img src={i02d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Poco nuvoloso</span>
          </>
        );
      case "03n":
        return (
          <>
            <img src={i03n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Nuvoloso sparso</span>
          </>
        );
      case "03d":
        return (
          <>
            <img src={i03d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Nuvoloso sparso</span>
          </>
        );
      case "04n":
        return (
          <>
            <img src={i04n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Molto nuvoloso</span>
          </>
        );
      case "04d":
        return (
          <>
            <img src={i04d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Molto nuvoloso</span>
          </>
        );
      case "09n":
        return (
          <>
            <img src={i09n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Pioggia a tratti</span>
          </>
        );
      case "09d":
        return (
          <>
            <img src={i09d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Pioggia a tratti</span>
          </>
        );
      case "10n":
        return (
          <>
            <img src={i10n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Pioggia</span>
          </>
        );
      case "10d":
        return (
          <>
            <img src={i10d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Pioggia</span>
          </>
        );
      case "11n":
        return (
          <>
            <img src={i11n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Temporale</span>
          </>
        );
      case "11d":
        return (
          <>
            <img src={i11d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Temporale</span>
          </>
        );
      case "13n":
        return (
          <>
            <img src={i13n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Neve</span>
          </>
        );
      case "13d":
        return (
          <>
            <img src={i13d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Neve</span>
          </>
        );
      case "50n":
        return (
          <>
            <img src={i50n} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Nebbia</span>
          </>
        );
      case "50d":
        return (
          <>
            <img src={i50d} alt="Weather Icon" className="d-flex ms-auto" width={50} />
            <span style={{ fontSize: "0.9rem" }}>Nebbia</span>
          </>
        );
      default:
        return <span>Icona non disponibile</span>;
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Dettagli Meteo - {giorno} {date.slice(8, 10)}/{date.slice(5, 7)}/{date.slice(0, 4)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hourlyWeather
          .filter((day) => day.dt_txt.includes(date.slice(0, 10)))
          .map((day, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center py-1 border-bottom">
              <div className="d-flex flex-column">
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                  <strong>Ore:</strong> {day.dt_txt.slice(11, 16)}
                </p>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                  <strong>Temperatura:</strong> {convertToCelsius(day.main.temp)} °C
                </p>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                  <strong>Umidità:</strong> {day.main.humidity} %
                </p>
                <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                  <strong>Vento:</strong> {day.wind.speed} km/h
                </p>
              </div>
              <div>{myWeatherIcon(day.weather[0].icon)}</div>
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
