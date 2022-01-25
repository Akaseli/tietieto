import React from 'react'
import { Marker} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

interface Props {
    lat: number,
    lng: number,
    id: number,
    displayName: string
}

export const MapMarker: React.FC<Props> = ({lat, lng, id, displayName}) => {
    const navigate = useNavigate();
 
     return(
         <Marker 
            position={[lat, lng]}
            eventHandlers={{
                click: (e) => {
                    navigate("/kelikamerat/" + id, {state:{name: displayName}})
                },
            }}   
        >

         </Marker>
     );
}