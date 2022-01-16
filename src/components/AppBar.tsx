import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css"

interface Props {

}

export const AppBar: React.FC<Props> = () => {
     return(
         <div className='AppBar'>
            <ul>
                <li><Link className='link button' to={"/"}>Koti</Link></li>
                <li><Link className='link button' to={"/tiesaa"}>Tiesääasemat</Link></li>
            </ul>
         </div>
     );
}