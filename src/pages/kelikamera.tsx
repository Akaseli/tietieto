import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import "./kelikamera.css"
import { TieSääAsema } from './tiesääasema';

interface Props {

}

interface CameraPreset{
    id: string,
    presentationName: string,
    imageUrl: string,
    measuredTime: string
}

interface State{
    name?: string
}

export const KeliKamera: React.FC<Props> = () => {
    const [preset, setPreset] = useState(0);
    const [cameraPreset, setCameraPresets] = useState<CameraPreset[]>([]);
    const [nearestWeatherStation, setNearestStation] = useState(0);

    const url = useParams();
    const stationId = url.stationId;

    const location = useLocation();

    const name = (location.state as State).name;

    useEffect(() => {
        axios.get("https://tie.digitraffic.fi/api/v1/data/camera-data/" + stationId)
        .then((response) =>{
            setNearestStation(response.data.cameraStations[0].nearestWeatherStationId);

            setCameraPresets(response.data.cameraStations[0].cameraPresets.map((preset:any, index:number) =>{
                return {id: preset.id, presentationName: preset.presentationName, imageUrl: preset.imageUrl, measuredTime: preset.measuredTime};
            }));
        })
    }, [])


    if(cameraPreset.length == 0) return <h1>Kamera ei välttämättä toimi.</h1>

    let weatherData = <h2>Säätä ei löydetty</h2>

    if(nearestWeatherStation != 0){
        weatherData = <TieSääAsema id={nearestWeatherStation} isDisplay={true}/>
    }

    const buttons = cameraPreset.map((preset, index) =>{
        return(
            <button
                key={index}
                className='button content'
                onClick={() => {setPreset(index)}}
            >{preset.presentationName}</button>    
        );
    })

     return(
         <div className='kelikamera'>
             <Link to={"/kelikamerat"}>Takaisin</Link>
             <h2 className='title'>{"Kelikamera " + name ?? stationId}</h2>
             <p className='updated'>{"Päivitetty : " + new Date(cameraPreset[preset].measuredTime).toLocaleString()}</p>
             {buttons}
             <h4>{cameraPreset[preset].presentationName}</h4>
             <div className='stationContent'>
                <img className='kelikamera' src={cameraPreset[preset].imageUrl}></img>
                {weatherData}
             </div>
             
         </div>
     );
}