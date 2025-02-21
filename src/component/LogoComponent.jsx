import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";

const LogoComponent = () => {
  return <Image src={logo} width={150} className="p-3 position-absolute mb-3" />;
};

export default LogoComponent;
