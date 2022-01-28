import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css"

interface Props {

}

export const AppBar: React.FC<Props> = () => {
     return(
         <div className='AppBar'>
            <ul>
                <li className='wide'><Link className='link button' to={"/"}>Etusivu</Link></li>
                <li className='wide'><Link className='link button' to={"/ajoneuvot"}>Ajoneuvot</Link></li>
                <li className='wide'><Link className='link button' to={"/kelikamerat"}>Kelikamerat</Link></li>
                <li className='wide'><Link className='link button' to={"/tiesaa"}>Tiesääasemat</Link></li>
            </ul>
         </div>
     );
}