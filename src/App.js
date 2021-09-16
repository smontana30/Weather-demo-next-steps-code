import './App.css';
import React, {useState, useEffect} from 'react';
import Search from './component/Search';
import Weather from './component/Weather';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function App() {
  const [city, setCity] = useState('miami');
  const apiKey = 'db690c96c746078c5e6137873380815f';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  const [weather, setWeather] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currWeather, setCurrWeather] = useState()

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setIsLoaded(true);
      })
    fetch(url1)
      .then(res => res.json())
      .then(data => setCurrWeather(data))
  }, [city])

  const weatherIcon = (weather) => {
    return `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  }

  return (
    <div className="App">
      <div className='search'>
        <Search city={city} updateCity={setCity}/>
      </div>
      {isLoaded ? (
        <div>
          <div className='weatherHeader' style={{display: 'flex', justifyContent: 'center'}}>
            <img style={{height: '50vh', width: '50vh'}} src={weatherIcon(currWeather.weather[0])} />
            <div style={{margin: '2vh'}}>
              <Typography variant='h3'>
                {currWeather.name}
              </Typography>
              <Typography variant='h4'>
                {currWeather.weather[0].description}
              </Typography>
            </div>
          </div>
          <div className='weather'>
            <Weather weatherObj={weather} currWeatherObj={currWeather}/>
          </div>
        </div>
        ) : <CircularProgress />}
      
    </div>
  );
}

export default App;
