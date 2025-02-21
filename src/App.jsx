import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchComponent from "./component/SearchComponent";
import CityCardList from "./component/CityCardList";
import LocalWeather from "./component/LocalWeather";

function App() {
  return (
    <>
      <SearchComponent />
      <LocalWeather />
      <CityCardList />
    </>
  );
}

export default App;
