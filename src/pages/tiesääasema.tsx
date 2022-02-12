import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { PageNotFoundPage } from './404';
import "./tiesää.css"

interface Props {
    id?: number,
    isDisplay?: boolean
}

interface SensorData{
    id: number,
    name: string,
    value: number,
    unit: string,
    descriptionFin?: string
}

interface LocationState{
    title?: string
}

interface WeatherData{
    error?: boolean,
    errorDesc?: string,
    errorReturnLink?: boolean,
    updated: string,
    sensors: SensorData[]
}

export const TieSääAsema: React.FC<Props> = ({id, isDisplay}) => {
    const url = useParams();
    const stationId = url.stationId;

    const location = useLocation();

    const title = (location.state as LocationState)?.title

    const [weatherData, setData] = useState<WeatherData>();

    //Hankkii sääaseman tiedot kerran
    useEffect(() =>{
        let url  = "https://tie.digitraffic.fi/api/v1/data/weather-data/" + id
        if(!isDisplay){
            document.title = "Tietieto | Tiesääasema " + stationId
            url= "https://tie.digitraffic.fi/api/v1/data/weather-data/" + stationId
        }
        if(isDisplay){
            if(id === undefined || id === 0){
                setData({error: true, errorDesc: "Sääasemaa ei määritetty.", errorReturnLink:false, updated: new Date().toLocaleString(), sensors:[]})
                return
            }
        }
       
        axios.get(url)
            .then((response) =>{            
                let timeString =  new Date(response.data.weatherStations[0].measuredTime).toLocaleString()

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
                setData({error: true, updated: new Date().toLocaleString(), sensors:[]})
            })

    }, [])


    //Palauttaa halutut sensorit
    const sensorList = weatherData?.sensors.map((sensor, index) =>{
        switch (sensor.id){
            case 1:
                return(
                    <p key={index}>{"Ilman lämpötila : " + sensor.value + sensor.unit}</p>
                );
            case 3:
                return(
                    <p key={index}>{"Tien lämpötila : " + sensor.value + sensor.unit}</p>
                );
            case 16:
                return(
                    <p key={index}>{"Tuulen keskinopeus : " + sensor.value + sensor.unit}</p>
                );
            case 18:
                return(
                    <p key={index}>{"Tuulen suunta : " + sensor.value + sensor.unit}</p>
                );
            case 21:
                return(
                    <p key={index}>{"Ilman kosteus : " + sensor.value + sensor.unit}</p>
                );
            case 26:
                return(
                    <p key={index}>{"Näkyvyys : " + sensor.value + sensor.unit}</p>
                );
            case 27:
                return(
                    <p key={index}>{"Keli : " + sensor.descriptionFin}</p>
                );
       

            default:
                return
        }
    });

    //Error
    if(weatherData?.error) return <PageNotFoundPage error={weatherData?.errorDesc ?? "Sääasemaa ei löydetty!"} showLink={weatherData.errorReturnLink}/>

    let displayName = stationId;

    if(title != undefined) displayName = title;

    //Normal
    return (
        <div className='tiesääasema'>
            <h2 className='title'>{"Tiesääasema " + displayName}</h2>
            <p className='updated'>{"Päivitetty : " + weatherData?.updated}</p>
            {sensorList}
        </div>
    );
}