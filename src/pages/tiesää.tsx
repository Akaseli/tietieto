import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./tiesää.css"

interface WeatherStationData {
    id: number,
    province: string,
    displayName: string
}

interface Provinces{
    name: string,
    extended: boolean
}

interface Props {

}

export const TieSää: React.FC<Props> = () => {
    
    const [provinceStations, setProvinceStations] = useState<WeatherStationData[][]>([]);
    const [provinces, setProvinces] = useState<Provinces[]>([]);
    
    //Vain kerran sivun ladatessa tekee requestin.
    useEffect(() => {
        let provinceWeatherStations:WeatherStationData[][] = [];
        let allWeatherStations:WeatherStationData[] = [];
        let provinces:Provinces[] = [];

        document.title = "Tietieto | Tiesääasemat"

        axios.get("https://tie.digitraffic.fi/api/v3/metadata/weather-stations")
        .then((response) => {
            response.data.features.map((feature:any, index:number) => {
                provinces[feature.properties.provinceCode - 1] = {name: feature.properties.province, extended: false};
                allWeatherStations.push({id: feature.id, province: feature.properties.province, displayName: feature.properties.names.fi});
            });
        })
        .then(() =>{
            provinces.forEach((province, index) => {
                provinceWeatherStations[index]  = allWeatherStations.filter((station) => station.province === province.name)
            });
            
            setProvinces(provinces);
            setProvinceStations(provinceWeatherStations);
        });
    }, []);
    
    const weatherStationList = provinceStations.map((province, index) =>{
        let extended = false;

        let stations = province.map((station, index) => {
            return (
                <Link key={station.id} className='link text'to={"/tiesaa/" + station.id}>{station.displayName}</Link>
            );
        })

        return(
            <div className='province' key={index}>
                <h2 onClick={() => {
                    let provinceCopy = provinces.slice();
                    provinceCopy[index].extended = !provinceCopy[index].extended;
                    setProvinces(provinceCopy)
                }}>{provinces[index].name}</h2>
                <div className='stations' style={provinces[index].extended ? {display: "block"} : {display: "none"}}>
                    {stations}
                </div>
            </div>
        );
    })

     return(
         <div>
             <h2 className='title'>Tiesääasemat</h2>
             <div className='provinces'>
                {weatherStationList}
             </div>
         </div>
     );
}