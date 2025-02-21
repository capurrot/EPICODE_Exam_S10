import { Col, Container, Row } from "react-bootstrap";
import CityCard from "./CityCard";

const CityCardList = () => {
  return (
    <>
      <Container fluid className="mt-auto">
        <h3 className="display-5">
          Meteo della Colombia
          <span className="ps-2" style={{ fontSize: "1rem" }}>
            (per appassionati come me)
          </span>
        </h3>
        <Row xs={1} sm={2} md={3} xxl={6}>
          <Col>
            <CityCard city="Bogotà" />
          </Col>
          <Col>
            <CityCard city="Cartagena" />
          </Col>
          <Col>
            <CityCard city="Medellin" />
          </Col>
          <Col>
            <CityCard city="Cali" />
          </Col>
          <Col>
            <CityCard city="San Andres" />
          </Col>
          <Col>
            <CityCard city="Villa de Leyva" />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CityCardList;
