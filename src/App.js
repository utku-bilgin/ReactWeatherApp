import React, { useState, useEffect } from 'react';
const api = {
  key: "031dbaaca9f82fde9d7e432fff48cbf1",
  base: "https://api.openweathermap.org/data/2.5/",
};



function App() {

  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherImage, setWeatherImage] = useState();

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          let imgsrc = ((typeof weather.weather[0].icon) != 'undefined' ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : null);
          setWeatherImage(imgsrc);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (

    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="time">
          {clock}
        </div>
        <div className="search-box">
          <input
            type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}??C
              </div>
              <div className="icon">
                <img src={weatherImage} alt="" />
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="description">{weather.weather[0].description}</div>
            </div>
          </div>

        ) : ('')}

      </main>
    </div>
  );
}

export default App;
