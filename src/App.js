import "./App.css";
import Map from "./components/Map";
import { createContext, useState } from "react";
import List from "./components/List.js";
import Search from "./components/Search";
export const ApplicationContext = createContext();

function App() {
  const [data, setData] = useState({
    latitude: "",
    longitude: "",
  });

  const [list, setList] = useState([]);

  return (
    <ApplicationContext.Provider value={{ data, setData, list, setList }}>
      <div className="App">
        <div className="Map-container">
          <Map />
        </div>
        
        <List />
      </div>
    </ApplicationContext.Provider>
  );
}

export default App;
