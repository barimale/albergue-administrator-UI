import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapDetailsContent, MapItemPopupContent, orangeIcon } from '../molecules/common/AlbergueMapHelper';
import { AlbergueMarker } from "../molecules/common/AlbergueMapHelper";
import { MapItem } from "../atoms/MapItem";
import React from 'react';
import { PortaledMarker } from '../molecules/common/PortaledMarker';

export const RestaurantsContent = () =>{
    return(
        <Restaurants/>
    );
}

const Restaurants = () => {
    return(
        <DeviceContextConsumer>
        {context =>
            <div style={{
                height: '100%',
                width: '100%',
                padding: '0px'
            }}>
                <MapDetails style={{
                    height: '100%',
                    width: '100%'}}
                />
            </div>
        }
        </DeviceContextConsumer>
    );
}

const restaurants: Array<MapItem> = [
    {
        name: "Quinta Amarela",
        description: "Restaurant",
        type: "flatware",
        position: [41.16123134123641, -8.624545974369896]
    },
    {
        name: "Restaurante Alicantina",
        description: "Restaurant",
        type: "flatware",
        position: [41.16084156863542, -8.621239458256467]
    },
    {
        name: "Confeitaria Nandinha",
        description: "Restaurant",
        type: "local_cafe",
        position: [41.16116896160765, -8.620868204545076]
    }
];

const MapDetails = (props: any) =>{
    return(
        <DeviceContextConsumer>
        {context =>
            <MapContainer center={restaurants[1].position} preferCanvas={true} zoom={17} scrollWheelZoom={true} 
            style={{
                width: '100%',
                height: `100%`,
                border: '0px'
            }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapDetailsContent items={restaurants}>
                    {restaurants.map((item: MapItem, index: number) => {
                        return (
                            <PortaledMarker
                                icon={orangeIcon}
                                index={index}
                                outerIndex={index}
                                keyy={'r'.repeat(index+1)}
                                item={item}
                                prefix={'restaurant'} 
                            />
                        );
                    })}
                </MapDetailsContent>
                <AlbergueMarker />
          </MapContainer>
        }
        </DeviceContextConsumer>
    );
}