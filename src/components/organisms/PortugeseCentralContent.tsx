import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import { MapDetailsContent, MapItemPopupContent, yellowIcon } from '../molecules/common/AlbergueMapHelper';
import { MapItem } from "../atoms/MapItem";
import L from 'leaflet';
import React from 'react';
import { PortaledMarker } from '../molecules/common/PortaledMarker';
// import * as Route from "../../assets/routes/central-portugal.gpx";

export const PortugeseCentralContent = () =>{
    return(
        <PortugeseCentral/>
    );
}

const PortugeseCentral = () => {
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

const accomodations: Array<MapItem> = [
    {
        name: "Senhora da Hora",
        description: "Albergue de Peregrinos da Senhora da Hora",
        phoneNumber: "+351 960 22 71 34",
        externalLink: "https://docs.google.com/forms/d/e/1FAIpQLScZ2OKFcXD1LeDnJIeX9XtPUSZl28Ex_225hfzgDy6mhqOTbA/viewform",
        type: "",
        position: [41.188587372011256, -8.64965398820744]
    },
    {
        name: "Moreira da Maia",
        description: "AirPorto Hostel",
        phoneNumber: "+351 229 42 73 97",
        externalLink: "https://www.booking.com/hotel/pt/airporto-hostel.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.23646377215915, -8.66235961518736]
    },
    {
        name: "Moreira da Maia",
        description: "Hotel Residencial Puma",
        phoneNumber: "+351 229 482 128",
        externalLink: "https://www.booking.com/hotel/pt/residencial-puma-moreira-maia.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.25357142556481, -8.6565884151869]
    },
    {
        name: "Joudina (Gião)",
        description: "Casa Mindela Guesthouse",
        phoneNumber: "+351 914 118 018",
        externalLink: "https://www.booking.com/hotel/pt/casa-mindela-guest-house.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.31521502063901, -8.680893486348776]
    },
    {
        name: "Vairão",
        description: "Albergue de Santiago - Mosteiro de Vairão",
        phoneNumber: "+351 966 431 916",
        type: "",
        position: [41.33302338225419, -8.669013542165985]
    },
    {
        name: "Vilarinho",
        description: "Casa da Laura",
        phoneNumber: "+351 917 76 73 07",
        type: "",
        position: [41.34048829044222, -8.68085775936686]
    },
    {
        name: "Vilarinho",
        description: "Casa Familia Vidal",
        phoneNumber: "+351 966 766 092",
        type: "",
        position: [41.33591522908765, -8.681032086348218]
    },
    {
        name: "São Miguel de Arcos",
        description: "Hotel Villa d’Arcos",
        phoneNumber: "+351 252 652 041",
        externalLink: "https://www.booking.com/hotel/pt/casa-bem-estar.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.399326025051934, -8.664321744019423]
    },
    {
        name: "São Miguel de Arcos",
        description: "Quinta de São Miguel de Arcos",
        phoneNumber: "+351 919 372 202",
        externalLink: "https://www.booking.com/hotel/pt/quinta-sao-miguel-de-arcos.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.396139186990126, -8.66675493052886]
    },
    {
        name: "São Pedro de Rates",
        description: "Albergue de peregrinos de São Pedro de Rates",
        phoneNumber: "+351 220 140 515",
        externalLink: "https://docs.google.com/forms/d/e/1FAIpQLSdNwgqW1mAgHIxYnxPDQtZZBeBUo_SRdsBW7UHyalMiHSdHTA/viewform",
        type: "",
        position: [41.42549148547251, -8.667084972855175]
    },
    {
        name: "São Pedro de Rates",
        description: "Casa Anabela",
        phoneNumber: "+351 919 578 642",
        type: "",
        position: [41.42430092396612, -8.667931015182253]
    },
    {
        name: "São Pedro de Rates",
        description: "Casa da Vila Guest House",
        phoneNumber: "+351 913 317 842",
        type: "",
        position: [41.425720727460835, -8.672822486345709]
    },
    {
        name: "Pedra Furada",
        description: "Casa D. Maria",
        phoneNumber: "+351 927 440 357",
        type: "",
        position: [41.47158937263037, -8.633988230274769]
    },
    {
        name: "Barcelinhos",
        description: "Albergue da Residência do Senhor do Galo",
        phoneNumber: "+351 253 833 304",
        type: "",
        position: [41.5271909845551, -8.624060688198208]
    },
    {
        name: "Barcelinhos",
        description: "Diora Hostel",
        phoneNumber: "+351 960 201 911",
        type: "",
        position: [41.52398582318925, -8.625705415179505]
    },
    {
        name: "Barcelinhos",
        description: "Barcelos Way Guest House",
        phoneNumber: "+351 253 82 50 90",
        type: "",
        position: [41.526747246406025, -8.622182757506495]
    },
    {
        name: "Vairão",
        description: "Albergue de Santiago - Mosteiro de Vairão",
        phoneNumber: "+351 966 431 916",
        type: "",
        position: [41.33302338225419, -8.669013542165985]
    },
    {
        name: "Barcelos",
        description: "In Barcelos Hostel & Guest House",
        phoneNumber: "+351 938 308 290",
        externalLink: "https://www.booking.com/hotel/pt/in-barcelos.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.52990583581845, -8.621631244015855]
    },
    {
        name: "Barcelos",
        description: "Residencial Kuarenta&Um",
        phoneNumber: "+351 932 117 730",
        externalLink: "https://www.booking.com/hotel/pt/residencial-kuarenta-um.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.53462122655701, -8.621845544015665]
    },
    {
        name: "Barcelos",
        description: "Art'Otel Barcelos",
        phoneNumber: "+351 253 185 819",
        externalLink: "https://www.booking.com/hotel/pt/art-39-otel-barcelos.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.533250142741146, -8.622315386342795]
    },
    {
        name: "Balugães",
        description: "Casas da Quinta da Cancela",
        phoneNumber: "+351 961 850 640",
        externalLink: "https://www.booking.com/hotel/pt/casas-da-quinta-da-cancela.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.64016144778745, -8.638949628666985]
    },
    {
        name: "Vitorino dos Piães",
        description: "Acogida Casa da Fernanda",
        phoneNumber: "+351 914 58 95 21",
        type: "",
        position: [41.66818808618974, -8.624791972848536]
    },
    {
        name: "Vitorino dos Piães",
        description: "Casa Rural O Estábulo de Valinhas",
        externalLink: "https://www.booking.com/hotel/pt/esta-bulo-de-valinhas.html?label=AlberguePorto&aid=1447648",
        phoneNumber: "+351 910 02 11 80",
        type: "",
        position: [41.6737832943896, -8.61818698633896]
    },
    {
        name: "Facha",
        description: "Casa das Torres",
        externalLink: "https://www.booking.com/hotel/pt/casa-das-torres-da-facha.html?label=AlberguePorto&aid=1447648",
        phoneNumber: "+351 258 74 16 72",
        type: "",
        position: [41.717693030308794, -8.617611959356486]
    },
    {
        name: "Sobreiro",
        description: "Albergue O Caminheiro",
        phoneNumber: "+351 968 408 882",
        type: "",
        position: [41.72788379932281, -8.623830728664563]
    },
    {
        name: "Ponte de Lima",
        description: "Pousada de Juventude de Ponte de Lima",
        phoneNumber: "+351 258 75 13 21",
        externalLink: "https://www.booking.com/hotel/pt/pousada-de-juventude-de-ponte-de-lima.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.76121926752214, -8.590094688191789]
    },
    {
        name: "Labruja",
        description: "Albergue O Conforto",
        phoneNumber: "+351 935 883 131",
        externalLink: "https://oconforto.wixsite.com/albergue",
        type: "",
        position: [41.83907180981712, -8.601127544007335]
    },
    {
        name: "Labruja",
        description: "Casa da Valada",
        phoneNumber: "+351 967 742 694",
        externalLink: "https://www.facebook.com/casadavalada",
        type: "",
        position: [41.83851228258718, -8.600258508254083]
    },
    {
        name: "Labruja",
        description: "Quinta Labruja",
        phoneNumber: "+351 935 268 485",
        externalLink: "https://www.booking.com/hotel/pt/quinta-labruja-labruja.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.83648195698516, -8.597168603353621]
    },
    {
        name: "São Roque",
        description: "Albergue de Alojamento Local Constantino",
        phoneNumber: "+351 968 43 20 59",
        externalLink: "https://www.booking.com/hotel/pt/albergue-alojamento-local.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.88955426954543, -8.62634964400596]
    },
    {
        name: "São Roque",
        description: "Pensão Repouso do Peregrino",
        phoneNumber: "+351 251 94 36 92",
        type: "",
        position: [41.889075053595015, -8.626360372842422]
    },
    {
        name: "Rubiães",
        description: "Casa de São Sebastião",
        phoneNumber: "+351 962 830 024",
        type: "",
        position: [41.915026578014356, -8.624249447222969]
    },
    {
        name: "Fontoura",
        description: "Casa da Quinta do Cruzeiro",
        phoneNumber: "+351 937 625 011",
        externalLink: "https://www.booking.com/hotel/pt/casa-quinta-do-cruzeiro.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.95600207259321, -8.632967013312436]
    },
    {
        name: "Paços",
        description: "Quinta Estrada Romana",
        phoneNumber: "+351 933 736 078",
        type: "",
        position: [41.97873300040949, -8.634517644003472]
    },
    {
        name: "Pedreira",
        description: "Quinta do Caminho",
        phoneNumber: "+351 251 82 11 83",
        externalLink: "https://www.booking.com/hotel/pt/quinta-do-caminho.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [41.984833454021725, -8.633880544003283]
    },
    {
        name: "Valença",
        description: "Residencial S. Gião",
        phoneNumber: "+351 251 03 00 40",
        externalLink: "https://www.booking.com/hotel/pt/residencial-s-giao.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [42.026355736933574, -8.642579560282751]
    },
    {
        name: "Valença",
        description: "Hotel Val de Flores",
        phoneNumber: "+351 251 82 41 06",
        externalLink: "https://www.booking.com/hotel/pt/val-flores.html?label=AlberguePorto&aid=1447648",
        type: "",
        position: [42.02644541427078, -8.643525772838613]
    }
];

const MapDetails = (props: any) =>{
    var accomodationIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    return(
        <DeviceContextConsumer>
        {context =>
            <MapContainer center={accomodations[17].position} preferCanvas={true} zoom={9} scrollWheelZoom={true} 
            style={{
                width: '100%',
                height: `100%`,
                border: '0px'
            }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayerGroup>
                <MapDetailsContent items={accomodations}>
                    {accomodations.map((item: MapItem, index: number) => {
                        return (
                            <PortaledMarker
                                icon={yellowIcon}
                                index={index}
                                outerIndex={index}
                                keyy={'c'.repeat(index+1)}
                                item={item}
                                prefix={'central'} 
                            />
                        );
                    })}
                </MapDetailsContent>
            </LayerGroup>
          </MapContainer>
        }
        </DeviceContextConsumer>
    );
}