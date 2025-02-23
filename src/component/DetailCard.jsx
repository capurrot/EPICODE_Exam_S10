import Card from "react-bootstrap/Card";
import { BsDropletHalf, BsWind } from "react-icons/bs";
import { Button } from "react-bootstrap";
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
import ModalComponent from "./ModalComponent";
import { useState } from "react";

const DetailCard = (props) => {
  const [show, setShow] = useState(false);
  const dayofWeek = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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

  return (
    <>
      <Card className="citycard my-2">
        <Card.Body>
          <Card.Title className="yellowcolombia mb-3">{dayofWeek[new Date(props.date).getDay()]}</Card.Title>
          <Card.Text className="text-light text-center mb-5 iconweather">{myWeatherIcon(props.icon)}</Card.Text>
          <Card.Text className="d-flex display-4 justify-content-center text-light mb-5">
            {props.temperature} °C
          </Card.Text>
          <Card.Text className="text-light d-flex justify-content-between text-center my-4">
            <span className="humwind">
              <strong>Umidità</strong>
              <br />
              <BsDropletHalf className="my-3" />
              <br />
              {props.humidity} %
            </span>
            <span className="humwind">
              <strong>Vento</strong>
              <br />
              <BsWind className="my-3" />
              <br />
              {props.wind.toLocaleString("it-IT")} km/h
            </span>
          </Card.Text>
          <Button className="btncolombia w-100" onClick={handleShow}>
            Dettaglio orario
          </Button>
        </Card.Body>
      </Card>
      <ModalComponent
        show={show}
        onHide={handleClose}
        hourlyWeather={props.hourlyWeather}
        date={props.date}
        giorno={dayofWeek[new Date(props.date).getDay()]}
      />
    </>
  );
};

export default DetailCard;
