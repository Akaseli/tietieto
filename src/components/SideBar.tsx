import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./SideBar.css"

interface Props {

}

export const SideBar: React.FC<Props> = () => {
    const [visibility, changeVisibility] = useState(false);


    const style = visibility? {display: "block"} : {display: "none"}

     return(
         <div>
            <div className='topbar'>
                <p onClick={() => {
                    changeVisibility(!visibility);
                }}>Valikko</p>
            </div>

            <div className='sidebar' style={style}>
                <p onClick={() => {
                    changeVisibility(!visibility);
                }}>Sulje</p>

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