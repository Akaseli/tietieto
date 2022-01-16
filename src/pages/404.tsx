import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
    error: string
}

export const PageNotFoundPage: React.FC<Props> = ({error}) => {
     return(
         <div>
             <h2 style={{marginBottom: "0"}}>{error}</h2>
             <Link className='link text' to={"/"}>Palaa etusivulle.</Link>
         </div>
     );
}