import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link } from "react-router";

const LogoComponent = () => {
  return (
    <>
      <Link to="/">
        <Image src={logo} width={150} className="p-3 d-none d-md-block position-absolute mb-3" />
        <Image src={logo} width={150} className="p-3 d-flex mx-auto d-md-none mb-3" />
      </Link>
    </>
  );
};

export default LogoComponent;
