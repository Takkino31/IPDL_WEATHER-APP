import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "./App.css";
function App() {
const [temp, setTemp] = useState("");
// const [desc, setDesc] = useState("");
const [icon, setIcon] = useState("");
const [city, setCity] = useState("");
const [description, setDescription] = useState("");

const [sunrise, setSunrise] = useState("");
const [sunset, setSunset] = useState("");

const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");

const [isReady, setReady] = useState(false);

function getCardClassName(temp) {
  if (temp < 15) {
    return 'card-cold';
  } else if (temp >= 15 && temp < 25) {
    return 'card-warm';
  } else {
    return 'card-hot';
  }
}

React.useEffect(() => {
fetch("https://api.openweathermap.org/data/2.5/weather?lat=12.5833&lon=-16.2719&appid=485eaae13c44dca81805beb5cfe0e7b3&units=metric")
    .then(result => result.json())
    .then(jsonresult => {
        setTemp(jsonresult.main.temp);
        setIcon(jsonresult.weather[0].icon);
        setDescription(jsonresult.weather[0].description);
        setCity(jsonresult.name);

        setLatitude(jsonresult.coord.lat);
        setLongitude(jsonresult.coord.lon);

        setSunrise( new Date (jsonresult.sys.sunrise * 1000).toLocaleString('fr-FR', { weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false })
        );
        setSunset( new Date (jsonresult.sys.sunset * 1000).toLocaleString('fr-FR', { weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false })
        );


        setReady(true);
    })
    .catch(err => console.error(err));
    }, []);
    if (isReady) {
        return (
          <div className="App" class="row ">
            
            <h1 class="text-center mt-5 dans votre app de météo">Bienvenue dans votre App Météo YAYA vAR's METEO</h1>
              <div class="col-6  d-flex justify-content-center px-3">
                        <div className={`card ${getCardClassName(temp)}`}>
                          <div class="card-header text-right">
                              <h2 class="ml-auto mr-4 mt-3 mb-0 "> {city}</h2>
                          </div>
                          <div class="card-body text-right">
                              <h1 class="ml-auto mr-4 "> {temp} °C</h1>
                              <p class="text-right">{description} </p>
                            
                          </div>
                          <div class="card-footer">
                            <h5 class="ml-4 mb-4 text-"><small> Levée: {sunrise}</small></h5>
                            <h5 class="ml-4 mb-4 text-"><small> Couchée: {sunset}</small></h5>
                          </div>  
                        </div>
              </div>

            
              <div class="col-6 d-flex justify-content-center">
                <div className={`card ${getCardClassName(temp)}`}>

                  <div class="justify-content-center m-4">

                        <div class="form-group  mt-3">
                          <label for="latitude">Latitude</label>
                          <input type="text" class="form-control" id="latitude" value={latitude} aria-describedby="latitude" placeholder="la latitude"/>
                        </div>

                        <div class="form-group  mt-3">
                          <label for="latitude">Longitude</label>
                          <input type="text" class="form-control" id="longitude" value={longitude}  aria-describedby="longitude" placeholder="la longitude"/>
                        </div>

                  </div>
                </div>
              </div>
          </div>

        );
    } else {
      return <div>Loading...</div>;
    }
  }
export default App;