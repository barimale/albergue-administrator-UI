import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { blueIcon, greenIcon, MapDetailsContent, MapItemPopupContent } from '../molecules/common/AlbergueMapHelper';
import { position } from "../molecules/common/AlbergueMapHelper";
import { MapItem } from "../atoms/MapItem";
import { CreateLayerItem } from './SightseeingContent';
import { LegendedOverlay } from "../molecules/common/LegendedOverlay";
import { GroupBy } from '../../utilities/CollectionsHelper';
import { useTranslation } from 'react-i18next';
import React from 'react';
import styled from 'styled-components';

export const LivingContent = () =>{
    return(
        <Living/>
    );
}

const Living = () => {

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

const livings: Array<MapItem> = [
    {
        name: "Continente Bom Dia Serpa Pinto",
        description: "Shopping centre",
        type: "ShoppingCentre",
        position: [41.1633360219944, -8.620945988525714]
    },
    {
        name: "Farmácia Barreiros",
        description: "Pharmacy",
        type: "Pharmacy",
        position: [41.16074183156456, -8.621021090380932]
    },
    {
        name: "Novo Banco",
        description: "ATM",
        type: "Atm",
        position: [41.15525313993203, -8.618818163399695]
    },
    {
        name: "CTT Boavista",
        description: "Post office",
        type: "PostOffice",
        position: [41.15872980771394, -8.62797753524917]
    },
    {
        name: "Porto Tourism Office",
        description: "Tourist office",
        type: "TouristOffice",
        position: [41.15043324003648, -8.611124566184273]
    }
];

const MapDetails = (props: any) =>{
    const grouped = GroupBy(livings, "type");
    const { t } = useTranslation();
    
    return(
        <DeviceContextConsumer>
        {context =>
        <MapContainer center={position} preferCanvas={true} zoom={14} scrollWheelZoom={true} 
        style={{
            width: '100%',
            height: `100%`,
            border: '0px'
        }}>
            <LayersControl position="topright" collapsed={context.valueOf() === DeviceType.isTabletOrMobile}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapDetailsContent items={livings}>
                    {Array.from(grouped.keys()).map((key: string, outerIndex: number) => {
                        return (
                            <LegendedOverlay 
                                icon={greenIcon}
                                outerIndex={outerIndex}
                                keyy={key}
                                items={grouped.get(key)} 
                                prefix={"living"}/>
                        );
                    })}
                </MapDetailsContent>
            </LayersControl>
          </MapContainer>
        }
        </DeviceContextConsumer>
    );
}

// const StyledLayersControl = styled(LayersControl)`
//     div.leaflet-control-layers-overlays {
//         id: "asdasdasd";

//         & label{
//             & div {
//                 display: flex !important;
//             }
//         }
//     }

// `;

// // background-color: red !important;
// // input {
// //     filter: invert(100%) hue-rotate(18deg) brightness(1.7);
// // }