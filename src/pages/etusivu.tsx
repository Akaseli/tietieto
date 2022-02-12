import React, { useEffect } from 'react'
import roadImage from '../assets/C0252003.jpg'
import ajoneuvoImage from '../assets/ajoneuvot.png'
import weatherImage from '../assets/C1450807.jpg'
import './etusivu.css'
import { Link } from 'react-router-dom'

interface Props {

}

export const Etusivu: React.FC<Props> = () => {
    useEffect(() =>{
        document.title = "Tietieto"
    })

     return(
         <div>
            <div className='container'>
                <div className='card'>
                    <Link to={"/kelikamerat"}>
                        <h3>Kelikamerat</h3>
                        <img src={roadImage}></img>
                    </Link>
                </div>

                <div className='card'>
                    <Link to={"/ajoneuvot"}>
                        <h3>Ajoneuvot</h3>
                        <img src={ajoneuvoImage}></img>
                    </Link>
                </div>

                <div className='card'>
                    <Link to={"/tiesaa"}>
                        <h3>Tiesääasemat</h3>
                        <img src={weatherImage}></img>
                    </Link>
                </div>

                <div className='card'>
                    <h3>Tietoa</h3>
                    <p>Tämä nettisivu näyttää tietoja Fintrafficin  <a href='https://www.digitraffic.fi/tieliikenne/' target={"_blank"}>rajapinnoista</a>.</p>
                </div>
            </div>
         </div>
     );
}