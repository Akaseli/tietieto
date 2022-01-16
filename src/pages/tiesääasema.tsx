import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PageNotFoundPage } from './404';
import "./tiesää.css"

interface Props {

}

interface SensorData{
    id: number,
    name: string,
    value: number,
    unit: string,
    descriptionFin?: string
}

interface WeatherData{
    error?: boolean,
    updated: string,
    sensors: SensorData[]
}

export const TieSääAsema: React.FC<Props> = () => {
    const url = useParams();
    const stationId = url.stationId;

    const [weatherData, setData] = useState<WeatherData>();

    //Hankkii sääaseman tiedot kerran
    useEffect(() =>{
        axios.get("https://tie.digitraffic.fi/api/v1/data/weather-data/" + stationId)
            .then((response) =>{
                var localTime = new Date(response.data.weatherStations[0].measuredTime);
                
                var timeString = localTime.toLocaleString()

                if(response.data.weatherStations[0].measuredTime === null){
                    timeString = "Ei tietoa"
                }

                const sensors:SensorData[] = [];

                response.data.weatherStations[0].sensorValues.map((sensor:any, index:number) =>{
                    sensors.push({id: sensor.id, name: sensor.name, value: sensor.sensorValue, unit: sensor.sensorUnit, descriptionFin: sensor.sensorValueDescriptionFi});
                })
                setData({updated: timeString, sensors: sensors})
            })
            .catch((error) => {
                var eDate = new Date()

                setData({error: true, updated: eDate.toLocaleString(), sensors:[]})
            })

    }, [])


    //Palauttaa halutut sensorit
    const sensorList = weatherData?.sensors.map((sensor, index) =>{
        switch (sensor.id){
            case 1:
                return(
                    <p>{"Ilman lämpötila : " + sensor.value + sensor.unit}</p>
                );
            case 3:
                return(
                    <p>{"Tien lämpötila : " + sensor.value + sensor.unit}</p>
                );
            case 16:
                return(
                    <p>{"Tuulen keskinopeus : " + sensor.value + sensor.unit}</p>
                );
            case 18:
                return(
                    <p>{"Tuulen suunta : " + sensor.value + sensor.unit}</p>
                );
            case 21:
                return(
                    <p>{"Ilman kosteus : " + sensor.value + sensor.unit}</p>
                );
            case 26:
                return(
                    <p>{"Näkyvyys : " + sensor.value + sensor.unit}</p>
                );
            case 27:
                return(
                    <p>{"Keli : " + sensor.descriptionFin}</p>
                );
       

            default:
                return
        }
    });

    //Error
    if(weatherData?.error) return <PageNotFoundPage error='Sääasemaa ei löydetty!'/>

    //Normal
    return (
        <div className='tiesääasema'>
            <h2 className='title'>{"Tiesääasema " + stationId}</h2>
            <p className='updated'>{"Päivitetty : " + weatherData?.updated}</p>
            {sensorList}
        </div>
    );
}