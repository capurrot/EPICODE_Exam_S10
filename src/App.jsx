import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchComponent from "./component/SearchComponent";
import CityCardList from "./component/CityCardList";

function App() {
  return (
    <>
      <SearchComponent />
      <CityCardList />
    </>
  );
}

export default App;
