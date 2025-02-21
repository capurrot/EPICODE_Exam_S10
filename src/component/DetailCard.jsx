import Card from "react-bootstrap/Card";
import { BsDropletHalf, BsWind } from "react-icons/bs";
import sun from "../assets/sun.png";
import fewClouds from "../assets/few_clouds.png";
import Clouds from "../assets/clouds.png";
import BrokenClouds from "../assets/broken_clouds.png";
import { Button } from "react-bootstrap";

const DetailCard = (props) => {
  const dayofWeek = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

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

  return (
    <Card className="citycard my-5">
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
        <Button className="btncolombia w-100">Dettaglio orario</Button>
      </Card.Body>
    </Card>
  );
};

export default DetailCard;
