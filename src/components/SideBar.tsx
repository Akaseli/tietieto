import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./SideBar.css";

import menuSvg from "../svg/menu.svg"
import closeSvg from "../svg/close.svg"

interface Props {

}

export const SideBar: React.FC<Props> = () => {
    const [visibility, changeVisibility] = useState(false);


    const style = visibility? {display: "block"} : {display: "none"}

    const shade = visibility? <div onClick={() => changeVisibility(!visibility)} className='shade'></div> : <div></div>

     return(
         <div>
            <div className='topbar'>
                <img onClick={() => changeVisibility(!visibility)}src={menuSvg}></img>
            </div>
            
            {shade}

            <div className='sidebar' style={style}>
                <img onClick={() => changeVisibility(!visibility)} src={closeSvg}></img>

                <ul>
                    <li onClick={() => changeVisibility(!visibility)}><Link className='link button' to={"/"}>Etusivu</Link></li>
                    <li onClick={() => changeVisibility(!visibility)}><Link className='link button' to={"/ajoneuvot"}>Ajoneuvot</Link></li>
                    <li onClick={() => changeVisibility(!visibility)}><Link className='link button' to={"/kelikamerat"}>Kelikamerat</Link></li>
                    <li onClick={() => changeVisibility(!visibility)}><Link className='link button' to={"/tiesaa"}>Tiesääasemat</Link></li>
                </ul>

            </div>
         </div>
     );
}