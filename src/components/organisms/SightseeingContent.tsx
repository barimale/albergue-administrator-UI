import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import { MapDetailsContent, purpleIcon } from '../molecules/common/AlbergueMapHelper';
import { MapItem } from "../atoms/MapItem";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { GroupBy } from '../../utilities/CollectionsHelper';
import { LegendedOverlay } from '../molecules/common/LegendedOverlay';

export const SightseeingContent = () =>{
    return(
        <Sightseeing/>
    );
}

const Sightseeing = () => {
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

const places: Array<MapItem> = [
    {
        name: "Sé do Porto",
        type: "Churches",
        description: "Porto Cathedral",
        externalLink: "https://www.visitportugal.com/en/content/se-catedral-do-porto",
        position: [41.14340955616284, -8.611099573481361]
    },
    {
        name: "Museu da Misericórdia do Porto",
        type: "Museums",
        description: "-",
        externalLink: "https://www.mmipo.pt/",
        position: [41.1442951427685, -8.614410145471583]
    },
    {
        name: "St James’ Anglican Church Porto",
        type: "Churches",
        description: "Th Church of England",
        externalLink: "https://www.stjamesoporto.org/",
        position: [41.15056391890568, -8.624060385779318]
    },
    {
        name: "Mosteiro da Serra do Pilar, Vila Nova de Gaia",
        type: "Churches",
        description: "Church",
        externalLink: "https://www.culturanorte.gov.pt/patrimonio/mosteiro-da-serra-do-pilar/",
        position: [41.13740463473928, -8.606598575497697]
    },
    {
        name: "Torre dos Clérigos",
        type: "Churches",
        description: "Church",
        externalLink: "http://www.torredosclerigos.pt/",
        position: [41.1457217467844, -8.614587136778562]
    },
    {
        name: "Livraria Lello",
        type: "Museums",
        description: "Museum",
        externalLink: "https://www.livrarialello.pt",
        position: [41.14691854801156, -8.614778716915282]
    },
    {
        name: "Palácio das Artes",
        type: "Monuments",
        description: "Monument",
        externalLink: "http://fcs.mg.gov.br/espacos-culturais/palacio-das-artes/",
        position: [41.14319987397481, -8.615010947690143]
    },
    {
        name: "Estacio de Sao Bento",
        type: "Monuments",
        description: "Monument",
        externalLink: "https://www.oporto.es/que-ver/estacion-de-sao-bento/",
        position: [41.14624938878163, -8.610527426435675]
    },
    {
        name: "Casa da Música",
        type: "Monuments",
        description: "Monument",
        externalLink: "https://www.casadamusica.com/",
        position: [41.16102933446714, -8.62824148164096]
    },
    {
        name: "Igreja dos Clérigos",
        type: "Monuments",
        description: "Monument",
        externalLink: "http://www.torredosclerigos.pt",
        position: [41.146248661814354, -8.614385263540067]
    },
    {
        name: "Igreja do Carmo",
        type: "Monuments",
        description: "Monument",
        externalLink: "https://www.facebook.com/tourCarmoPorto/",
        position: [41.148003720715735, -8.616247247186061]
    },
    {
        name: "Monumento a Garrett",
        type: "Monuments",
        description: "Monument",
        externalLink: "http://www.monumentos.gov.pt/Site/APP_PagesUser/SIPA.aspx?id=27819",
        position: [41.15033006906184, -8.611287688504975]
    }
];

export function CreateLayerItem(name: string): string {
    var asString = ReactDOMServer.renderToString(
        React.createElement(
            LayerItem, 
            {name: name}, 
            null));

    return asString;
}

const LayerItem = (props: any) =>{
    const { name } = props;
    const theme = useTheme();

    return(
        <DeviceContextConsumer>
        {context =>
            <Typography 
                style={{
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                    paddingLeft: '0px',
                    margin: '0px',
                    color: `${theme.palette.common.black}`,
                    fontFamily: 'Signoria-Bold !important'
            }}>
                {name}
            </Typography>
        }</DeviceContextConsumer>
    );
}

const MapDetails = (props: any) =>{
    const { t, i18n } = useTranslation();
    const grouped = GroupBy(places, "type");

    return(
        <DeviceContextConsumer>
        {context =>
            <MapContainer 
                placeholder={<div>{t("Loading...")}</div>}
                center={places[places.length -1].position} preferCanvas={true} zoom={14} scrollWheelZoom={true} 
            style={{
                width: '100%',
                height: `100%`,
                border: '0px'
            }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright" collapsed={context.valueOf() === DeviceType.isTabletOrMobile}>
                <MapDetailsContent items={places}>
                    {Array.from(grouped.keys()).map((key: string, outerIndex: number) => {
                        return (
                            <LegendedOverlay 
                                icon={purpleIcon}
                                outerIndex={outerIndex} 
                                keyy={key} 
                                items={grouped.get(key)} 
                                prefix={"sightseeing"}/>
                        );
                    })}
                </MapDetailsContent>
            </LayersControl>
          </MapContainer>
        }
        </DeviceContextConsumer>
    );
}


