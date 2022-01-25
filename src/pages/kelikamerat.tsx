import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useNavigate } from 'react-router-dom';
import { MapMarker } from '../components/MapMarker';
import './map.css'


interface Props {
    zoom?: number,
    lat?: number,
    lng?: number
}

interface Coords {
    lat: number,
    lng: number
}

interface CameraStation {
    id: number,
    coordinates: Coords,
    roadStationId: number
    name: string
}

export const KeliKamerat: React.FC<Props> = ({zoom, lat, lng}) => {
    const [stations, setStations] = useState<CameraStation[]>([])
    
    useEffect(() => {
        document.title = "Tietieto | Kelikamerat"

        let stations: CameraStation[] = [];
        //Requesti kelikameroiden sijanneista
        axios.get("https://tie.digitraffic.fi/api/v3/metadata/camera-stations")
            .then((response) => {
                response.data.features.map((feature: any, index: number) => {
                    stations.push({
                        id: feature.properties.id,
                        coordinates: { lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] },
                        roadStationId: feature.properties.roadStationId,
                        name: feature.properties.names.fi
                    });
                })

                setStations(stations)
            })

    }, [])

    let navigate = useNavigate();

    const markers = stations.map((station, index) => {
        return (
            <MapMarker key={index} id={station.id} lat={station.coordinates.lat} lng={station.coordinates.lng} displayName={station.name}/>
        );
    })

    if (!stations) return <div></div>

    return (
        <div>
            <MapContainer center={[lat ?? 64, lng ?? 26]} zoom={zoom ?? 5} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {markers}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}