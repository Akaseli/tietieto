import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./tiesää.css"

interface WeatherStationData {
    id: number,
    province: String,

}

interface Props {

}

export const TieSää: React.FC<Props> = () => {
    
    const [weatherStations, setValue] = useState<WeatherStationData[]>([])

    const weatherStationRequest:WeatherStationData[] = []

    //Vain kerran sivun ladatessa tekee requestin.
    useEffect(() => {
        document.title = "Tietieto | Tiesääasemat"

        axios.get("https://tie.digitraffic.fi/api/v3/metadata/weather-stations")
        .then((response) => {
            response.data.features.map(function(feature:any, index:number){
                weatherStationRequest.push({id: feature.id, province: feature.properties.province});
            });
        })
        //Pakottaa sivun uudelleen renderöimään
        .then(() =>{
            setValue(weatherStationRequest);
        });
    }, []);
    
    const weatherStationList = weatherStations.map((station, index) =>{
        return(
            <div key={station.id}>
                <Link className='link text' to={"/tiesaa/" + station.id}>{station.id + ", " + station.province}</Link>
            </div>
        );
    })

     return(
         <div>
             <h2 className='title'>Tiesääasemat</h2>
             {weatherStationList}
         </div>
     );
}