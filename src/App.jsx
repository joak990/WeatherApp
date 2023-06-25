import image from "./images/heat.png";
import Humidity from "./images/humidity.png";
import Wind from "./images/wind.png";
import sun from "./images/sun.png";
import rain from "./images/rain.png";
import drizzle from "./images/drizzle.png";
import mist from "./images/mist.png";
import thunderstorm from "./images/trunderstorm.png";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: "london",
    Humidity: 10,
    speed: 2,
    image: image,
  });

  const [name, setName] = useState("");

  const handleclick = () => {
    if (name !== "") {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=23dad0edc4f7033690b2fa63bf183322&&units=metric`;
      axios
        .get(apiurl)
        .then((res) => {
          let imagepath = "";
          console.log(res.data);
          if (res.data.weather[0].main === "Clouds") {
            imagepath = image;
          } else if (res.data.weather[0].main === "Clear") {
            imagepath = sun;
          } else if (res.data.weather[0].main === "Rain") {
            imagepath = rain;
          } else if (res.data.weather[0].main === "Drizzle") {
            imagepath = drizzle;
          } else if (res.data.weather[0].main === "Mist") {
            imagepath = image;
          } else if (res.data.weather[0].main === "Thunderstorm") {
            imagepath = thunderstorm;
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            Humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagepath,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleclick();
    }
  };

  const LupaIcono = () => <FaSearch size={20} />;
  return (
    <div className="container">
      <div className="title">
        <h1>Weather APP</h1>
      </div>

      <div className="wheater">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleclick}>
            <LupaIcono />
          </button>
        </div>
        <div className="info">
          <img src={data.image} alt="" />
          <h1>{Math.round(data.celcius)} °</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img className="humidity" src={Humidity} alt="" />
              <div className="humidi">
                <p>{Math.round(data.Humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col"></div>
            <img className="img" src={Wind} alt="" />
            <div className="wind">
              <div>
                <p className="p3">{Math.round(data.speed)}km/h</p>
              </div>
              <div className="p2">
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
