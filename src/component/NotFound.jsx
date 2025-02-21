import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center mt-5">
        <Col md={8}>
          <h1 className="display-3 text-light">404 — Risorsa non trovata!</h1>
          <p className="lead"> La pagina che stai cercando non è disponibile.</p>

          <Link to="/" className="btn btncolombia">
            Torna alla pagina principale
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default NotFound;
