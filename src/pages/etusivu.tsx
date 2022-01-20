import React, { useEffect } from 'react'

interface Props {

}

export const Etusivu: React.FC<Props> = () => {
    useEffect(() =>{
        document.title = "Tietieto"
    })

     return(
         <div>
             <h2>Etusivu</h2>
         </div>
     );
}