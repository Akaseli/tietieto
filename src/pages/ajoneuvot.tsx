import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useNavigate } from 'react-router-dom';
import * as Paho from "paho-mqtt"

import './map.css'
import {getTaskColor} from '../polylineColors'
import { LatLngExpression } from 'leaflet';


interface Props {

}

interface Vehicle {
    id: number,
    lat: number,
    lng: number,
    tasks: string[],
    time: string,
}

interface TasksMeanings {
    id: string,
    nameFi: string,
    nameEn: string,
    nameSV: string,
}

interface PolyLine{
    coords: LatLngExpression[],
    color: string
}

export const Ajoneuvot: React.FC<Props> = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])

    var vehicleTemp: Vehicle[] = [];
    const [taskMeanings, setTaskMeanings] = useState<TasksMeanings[]>([]);

    //https://www.digitraffic.fi/tieliikenne/#websocket-rajapinnat
    const client = new Paho.Client("tie.digitraffic.fi", 61619, "tietieto")

    function connect() {
        client.onConnectionLost = function (response) {
            console.info(Date.now() + ' Connection lost:' + response.errorMessage);
        };

        client.onMessageArrived = function (message) {
            handleResponse(message.payloadString);
        };

        client.connect({ mqttVersion: 4, useSSL: true, userName: "digitraffic", password: "digitrafficPassword", onSuccess: onConnect });
    }

    function onConnect() {
        console.info("Yhteys avattu");
        client.subscribe("maintenance/tracking/#");
    }


    //Sivun ladatessa
    useEffect(() => {
        document.title = "Tietieto | Ajoneuvot"

        //Hanki tehtävien kuvaukset
        axios.get("https://tie.digitraffic.fi/api/v3/data/maintenance/trackings/tasks")
            .then((response) => {
                let tempTasks: TasksMeanings[] = [];

                response.data.map((task: any, index: number) => {
                    tempTasks.push({ id: task.id, nameFi: task.nameFi, nameEn: task.nameEn, nameSV: task.nameSV })
                })

                setTaskMeanings([...tempTasks])
            });


        //Hanki ajoneuvojen data valmiiksi
        axios.get("https://tie.digitraffic.fi/api/v3/data/maintenance/trackings/latest")
            .then((response) => {
                response.data.features.map((feature: any, index: number) => {
                    vehicleTemp.push({ id: feature.properties.id, tasks: feature.properties.tasks, lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0], time: new Date(feature.properties.time).toLocaleString()})
                });

                setVehicles([...vehicleTemp]);
            });

        //Live päivittyvä data
        if (!client.isConnected()) {
            connect();
        }

        return () => {
            if (client.isConnected()) {
                client.disconnect()
            }
            console.log("Disconnected")
        }
    }, [])


    //Muut päivitykset
    useEffect(() => {
        if(!activeVehicle) return;
        
        drawRoute(activeVehicle);
    }, [vehicles])



    
    //WS Data käsittely
    function handleResponse(message: any) {

        var content = JSON.parse(message);

        //Ajoneuvon sijainti
        if (content.type === "Feature") {
            let match = false;

            vehicleTemp.forEach((vehicle) => {
                if (vehicle.id === content.properties.id) {
                    vehicle.lat = content.geometry.coordinates[1];
                    vehicle.lng = content.geometry.coordinates[0];
                    vehicle.tasks = content.properties.tasks;

                    match = true
                }
            })
            if (!match) {
                vehicleTemp.push({ id: content.properties.id, lat: content.geometry.coordinates[1], lng: content.geometry.coordinates[0], tasks: content.properties.tasks, time: new Date(content.properties.time).toLocaleString() })
            }
        }
        //Muut ilmoitukset harvemmin
        else {
            //Päivittyy joka kerta kun WS sanoo yhteyden toimivan.
            setVehicles([...vehicleTemp]);
        }
    }


    const [polyline, setLine] = useState<PolyLine>({coords:[[0, 0]], color:"#FFFFFF"});
    const [activeVehicle, setActiveVehicle] = useState<Vehicle>();


    //Yhden ajoneuvon reitti
    function drawRoute(vehicle:Vehicle){
        let tempLine:LatLngExpression[] = [];
        axios.get("https://tie.digitraffic.fi/api/v3/data/maintenance/trackings/" + vehicle.id)
        .then((response) => {
            if(response.data.geometry.type === "LineString"){
                response.data.geometry.coordinates.map((coordinates:any, index:number) => {
                    tempLine.push([coordinates[1], coordinates[0]])
                });
            }
            setLine({color: getTaskColor(vehicle.tasks[0]), coords:tempLine})
        });
    }

    const markers = vehicles.map((vehicle, index) => {
        let tasks = vehicle.tasks.map((task, index) => {
            let taskName = taskMeanings.find((tMeaning) => tMeaning.id === task)?.nameFi ?? task

            return (
                <p key={index}>{taskName}</p>
            );
        })

        return (
            <Marker key={index} position={[vehicle.lat, vehicle.lng]}>
                <Popup>
                    <div className='popup'>
                        <h3>{"Ajoneuvo : " + vehicle.id}</h3>
                        <p className='updated'>{"Päivitetty : " + vehicle.time}</p>
                        <h4>Tehtävät:</h4>
                        {tasks}
                        <button className='button content' onClick={() => {
                            drawRoute(vehicle)
                            setActiveVehicle(vehicle)
                        }}>Piirrä reitti</button>
                    </div>
                </Popup>
            </Marker>
        );
    });


    return (
        <div className='vehicles'>
            <MapContainer center={[64, 26]} zoom={5} scrollWheelZoom={true} tap={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={polyline.coords} pathOptions={{color: polyline.color}}></Polyline>

                <MarkerClusterGroup>
                    {markers}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}