import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    error: string,
    showLink?: boolean,
}

export const PageNotFoundPage: React.FC<Props> = ({ error, showLink}) => {

    useEffect(() =>{
        document.title = "Sivua ei löytynyt!"
    })

    if(showLink === false){
        return(
            <div>
                <h2 style={{ marginBottom: "0" }}>{error}</h2>
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ marginBottom: "0" }}>{error}</h2>
            <Link className='link text' to={"/"}>Palaa etusivulle.</Link>
        </div>
    );
}