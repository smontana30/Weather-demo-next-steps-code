import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import './Weather.css'

function Weather({weatherObj, currWeatherObj}) {
    console.log(weatherObj);
    console.log(currWeatherObj);
    const sunSet = new Date(currWeatherObj.sys.sunset * 1000);
    const sunRise = new Date(currWeatherObj.sys.sunrise * 1000);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    const weatherIcon = (weather) => {
        return `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    }

    const kelvinToFarenheit = (k) => {
        return Math.floor((((k - 273.15) * 9) / 5) + 32)
    }

    const getDate = (date) => {
        let readableDate= new Date(date * 1000);
        let month = months[readableDate.getMonth()];
        let day = days[readableDate.getDay()];
        let numDate = readableDate.getDate();
        const dateStr = day + ', ' + numDate + ' ' + month
        return dateStr;
    }

    const getTime = (dt) => {
        let time= new Date(dt * 1000);
        let nightOrDay = 'Am';
        let hours = time.getHours();
        let minutes = time.getMinutes() < 10 ? ('0'+ time.getMinutes()) : time.getMinutes();
        if (hours >= 12) 
            nightOrDay = 'Pm';
        const timeStr = hours + ':' + minutes + ' ' + nightOrDay;
        return timeStr;
    }

    return (
        <Box 
        >
            <div style={{display: 'flex', flexDirection: 'column',}}>
                <div className='topBox' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Typography variant='h1' className='CurrWeatherHeader'>
                        Now {kelvinToFarenheit(currWeatherObj.main.temp)}&deg;
                    </Typography>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div className='weatherDetails' style={{flexDirection: 'column', margin: '1vh'}} >
                            <Typography variant='h4'>
                                High: {kelvinToFarenheit(currWeatherObj.main.temp_max)}&deg;
                            </Typography>
                            <Typography variant='h4'>
                                Low: {kelvinToFarenheit(currWeatherObj.main.temp_min)}&deg;
                            </Typography>
                        </div>
                        <div className='weatherDetails'>
                            <Typography variant='h5'>
                                    Feels like {kelvinToFarenheit(currWeatherObj.main.feels_like)}&deg;
                            </Typography>
                            <Typography variant='h5'>
                                Humidity: {currWeatherObj.main.humidity}%
                            </Typography>
                            <Typography variant='h5'>
                                Wind: {currWeatherObj.wind.speed}m/s
                            </Typography>
                        </div>
                        <div className='weatherDetails'>
                            <Typography variant='h5'>
                                Pressure: {currWeatherObj.main.pressure}mb
                            </Typography>
                            <Typography variant='h5'>
                                Visibility: {currWeatherObj.visibility}km
                            </Typography>   
                        </div>                    
                        <div className='weatherDetails'>
                            <Typography variant='h5'>
                                Sunrise: {sunRise.getUTCHours() + ':' + ((sunRise.getMinutes() < 10) ? ('0' + sunRise.getMinutes()) : sunRise.getMinutes())}Am
                            </Typography>
                            <Typography variant='h5'>
                                SunSet: {sunSet.getUTCHours() + ':' + ((sunSet.getMinutes() < 10) ? ('0' + sunSet.getMinutes()) : sunSet.getMinutes())}Pm
                            </Typography>
                        </div>
                    </div>
                    
                </div>
                <div className='bottomBox' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                    {weatherObj.list.map((forcast, index) => (
                        <div>
                            {index % 4 == 0 ? (
                                <Card style={{margin: '2vh', width: '30vh'}} raised>
                                    <CardHeader
                                        title={getDate(forcast.dt)}
                                        subheader={getTime(forcast.dt)}
                                    />
                                    <img src={weatherIcon(forcast.weather[0])} />
                                    <CardContent>
                                        <Typography variant='h4'>
                                            {kelvinToFarenheit(forcast.main.temp)}&deg;
                                        </Typography>
                                        <Typography variant='h6'>
                                            {kelvinToFarenheit(forcast.main.temp_max)}&deg; / {kelvinToFarenheit(forcast.main.temp_min)}&deg;
                                        </Typography>
                                        <Typography variant='h6'>
                                            {forcast.weather[0].description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ) : ''}
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );
}

export default Weather;