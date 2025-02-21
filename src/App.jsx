import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LocalWeather from "./component/LocalWeather";
import SearchComponent from "./component/SearchComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchWeather from "./component/SearchWeather";
import { useState } from "react";
import DetailComponent from "./component/DetailComponent";
import LogoComponent from "./component/LogoComponent";

function App() {
  const [city, setCity] = useState("");
  return (
    <>
      <BrowserRouter>
        <LogoComponent />
        <SearchComponent setCity={setCity} />
        <Routes>
          <Route path="/" element={<LocalWeather />} />

          {/* Imposto che se per caso nella page search l'utente effettuasse 
          un refresh ripresenta il componente di meteo locale. */}
          {city === "" ? (
            <Route path="/search" element={<LocalWeather />} />
          ) : (
            <Route path="/search" element={<SearchWeather city={city} />} />
          )}
          <Route path="/detail/:city" element={<DetailComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
