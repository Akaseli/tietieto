import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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

export const KeliKamera: React.FC<Props> = () => {
    const [preset, setPreset] = useState(0);
    const [cameraPreset, setCameraPresets] = useState<CameraPreset[]>([]);
    const [nearestWeatherStation, setNearestStation] = useState(0);

    const url = useParams();
    const stationId = url.stationId;

    useEffect(() => {
        const tempPresets:CameraPreset[] = []

        axios.get("https://tie.digitraffic.fi/api/v1/data/camera-data/" + stationId)
        .then((response) =>{
            setNearestStation(response.data.cameraStations[0].nearestWeatherStationId);

            response.data.cameraStations[0].cameraPresets.map((preset:any, index:number) =>{
                tempPresets.push({id: preset.id, presentationName: preset.presentationName, imageUrl: preset.imageUrl, measuredTime: preset.measuredTime});
            });

            setCameraPresets(tempPresets);
        })
    }, [])


    if(cameraPreset.length == 0) return <h1>Kamera ei välttämättä toimi.</h1>

    let weatherData = <h2>Säätä ei löydetty</h2>

    if(nearestWeatherStation != 0){
        weatherData = <TieSääAsema id={nearestWeatherStation} isDisplay={true}/>
    }

    const buttons = cameraPreset.map((preset, index) =>{
        return(
            <button className='button content'
                onClick={() => {setPreset(index)}}
            >{preset.presentationName}</button>    
        );
    })

     return(
         <div className='kelikamera'>
             <h2 className='title'>{"Kelikamera " + stationId}</h2>
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