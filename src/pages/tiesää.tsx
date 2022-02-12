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
    const [stations, setStations] = useState<WeatherStationData[]>([]);
    
    useEffect(() => {
        document.title = "Tietieto | Tiesääasemat"

        axios.get("https://tie.digitraffic.fi/api/v3/metadata/weather-stations")
        .then((response) => {
            const provinceNames = Array.from(new Set(response.data.features.map((feature:any, index:number) => {
                return feature.properties.province
            })));

            setProvinces(provinceNames.map((name:any) => {
                return {name: name, extended: false};
            }));

            setStations(response.data.features.map((feature:any) => {
                return {id: feature.id, province: feature.properties.province, displayName: feature.properties.names.fi};
            }));
        })
    }, []);

    useEffect(() => {
        setProvinceStations(provinces.map((province, index) => {
            return stations.filter((station) => station.province === province.name)
        }));
    }, [provinces])
    
    const weatherStationList = provinceStations.map((province, index) =>{
        let stations = province.map((station, index) => {
            return (
                <Link key={station.id} className='link text'to={"/tiesaa/" + station.id} state={{title: station.displayName}}>{station.displayName}</Link>
            );
        })

        return(
            <div className='province' key={index}>
                <h4 onClick={() => {
                    let provinceCopy = provinces.slice();
                    provinceCopy[index].extended = !provinceCopy[index].extended;
                    setProvinces(provinceCopy)
                }}>{provinces[index].name}</h4>
                <div className={provinces[index].extended? "stations expanded" : "stations"}>
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