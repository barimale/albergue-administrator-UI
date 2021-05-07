import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapDetailsContent, MapItemPopupContent, yellowIcon } from '../molecules/common/AlbergueMapHelper';
import { MapItem } from "../atoms/MapItem";
import L from 'leaflet';
import React, { Component } from 'react';
import { PortaledMarker } from '../molecules/common/PortaledMarker';

export const PortugeseCoastContent = () =>{
    return(
        <PortugeseCoast/>
    );
}

const PortugeseCoast = () => {
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
        name: "Praia de Angeiras",
        description: "Camping Orbitur Angeiras",
        phoneNumber: "+351 229 270 571",
        externalLink: "https://www.booking.com/hotel/pt/campismo-orbitur-angeiras-angeiras.en-gb.html?aid=1893447;label=metagha-link-mapresultsPT-hotel-1424719_dev-desktop_los-1_bw-1_dow-Monday_defdate-1_room-0_lang-en_curr-EUR_gstadt-2_rateid-ein1_aud-1046869801_cid-_gacid-6471735482_mcid-10_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20210419;sid=c4dc12d41b948ab9741aa73085908611;all_sr_blocks=142471901_101197257_0_0_0;checkin=2021-04-19;checkout=2021-04-20;dest_id=-2158369;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;highlighted_blocks=142471901_101197257_0_0_0;hpos=1;no_rooms=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=142471901_101197257_0_0_0__6050;srepoch=1618740937;srpvid=adca482408b000b4;type=total;ucfs=1&#hotelTmpl",
        type: "",
        position: [41.268384946117024, -8.72014714216776]
    },
    {
        name: "Vila do Conde",
        description: "Bellamar Hostel",
        phoneNumber: "+351 252 631 748",
        externalLink: "https://www.booking.com/hotel/pt/bellamar-hostel.en-gb.html?aid=1447648;label=AlberguePorto;sid=c4dc12d41b948ab9741aa73085908611;checkin=2021-04-19;checkout=2021-04-20;dest_id=-2179489;dest_type=city;dist=0;from_beach_key_ufi_sr=1;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;room1=A%2CA;sb_price_type=total;soh=1;sr_order=popularity;srepoch=1618741040;srpvid=d71a4857cbc100d9;type=total;ucfs=1&#no_availability_msg",
        type: "",
        position: [41.35223488411579, -8.740680099838366]
    },
    {
        name: "Vila do Conde",
        description: "Venceslau Wine Boutique Hostel",
        phoneNumber: "+351 252 646 362",
        externalLink: "https://www.booking.com/hotel/pt/hospedaria-venceslau.en-gb.html?aid=1447648;label=AlberguePorto;sid=c4dc12d41b948ab9741aa73085908611;all_sr_blocks=100998611_206151379_2_40_0;checkin=2021-04-19;checkout=2021-04-20;dest_id=-2179489;dest_type=city;dist=0;from_beach_key_ufi_sr=1;group_adults=2;group_children=0;hapos=1;highlighted_blocks=100998611_206151379_2_40_0;hpos=1;no_rooms=1;room1=A%2CA;sb_price_type=total;sr_order=popularity;sr_pri_blocks=100998611_206151379_2_40_0__4500;srepoch=1618741164;srpvid=48664895317800f7;type=total;ucfs=1&#hotelTmpl",
        type: "",
        position: [41.35789799921989, -8.742206886347615]
    },
    {
        name: "Vila do Conde",
        description: "Residencial Princesa do Ave",
        phoneNumber: "+351 252 642 065",
        externalLink: "http://www.princesadoave.com/",
        type: "",
        position: [41.355176280717515, -8.748685759366477]
    },
    {
        name: "Povoa de Varzim",
        description: "Hostel Sardines & Friends",
        phoneNumber: "+351 962 083 329",
        externalLink: "https://www.booking.com/hotel/pt/sardines-and-friends.en-gb.html?aid=1447648;label=AlberguePorto;sid=c4dc12d41b948ab9741aa73085908611;all_sr_blocks=50220805_195111122_2_0_0;checkin=2021-04-19;checkout=2021-04-20;dest_id=-2173345;dest_type=city;dist=0;from_beach_key_ufi_sr=1;group_adults=2;group_children=0;hapos=1;highlighted_blocks=50220805_195111122_2_0_0;hpos=1;no_rooms=1;room1=A%2CA;sb_price_type=total;show_room=50220805;sr_order=popularity;sr_pri_blocks=50220805_195111122_2_0_0__3000;srepoch=1618741301;srpvid=cc9248da124d00ab;type=total;ucfs=1&#RD50220805",
        type: "",
        position: [41.378890643136565, -8.762571001692901]
    },
    {
        name: "Povoa de Varzim",
        description: "Residência Rêve d'Or",
        phoneNumber: "+351 252 613 870",
        externalLink: "https://www.booking.com/hotel/pt/residaancia-raave-d-or.en-gb.html?aid=1447648;label=AlberguePorto;sid=c4dc12d41b948ab9741aa73085908611;checkin=2021-04-19;checkout=2021-04-20;dest_id=-2173345;dest_type=city;dist=0;from_beach_key_ufi_sr=1;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;room1=A%2CA;sb_price_type=total;soh=1;sr_order=popularity;srepoch=1618741367;srpvid=257b48fb0d6f00a0;type=total;ucfs=1&#no_availability_msg",
        type: "",
        position: [41.38155228201302, -8.761728828674064]
    },
    {
        name: "Aguçadoura",
        description: "Aguçadoura Guest House",
        phoneNumber: "+351 915 096 050",
        externalLink: "https://www.booking.com/hotel/pt/agucadoura-guest-house.en-gb.html?aid=1447648;label=AlberguePorto;sid=c4dc12d41b948ab9741aa73085908611;checkin=2021-04-19;checkout=2021-04-20;dest_id=-2173345;dest_type=city;dist=0;from_beach_key_ufi_sr=1;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;room1=A%2CA;sb_price_type=total;soh=1;sr_order=popularity;srepoch=1618741450;srpvid=1da14924ae09001b;type=total;ucfs=1&#no_availability_msg",
        type: "",
        position: [41.42229569616276, -8.78092573052814]
    },
    {
        name: "Estela",
        description: "Camping Orbitur Rio Alto",
        phoneNumber: "+351 252 615 699",
        type: "",
        position: [41.46364153792801, -8.772792172854091]
    },
    {
        name: "Apúlia",
        description: "Albergue Santiago da Costa",
        phoneNumber: "+351 961 885 803",
        type: "",
        position: [41.485377473231786, -8.772751172853463]
    },
    {
        name: "Fão",
        description: "Casa da Matriz",
        phoneNumber: "+351 964 251 369",
        type: "",
        position: [41.51265825649587, -8.772354272852732]
    },
    {
        name: "Fão",
        description: "Pousada da Juventude Foz do Cávado",
        phoneNumber: "+351 253 982 045",
        externalLink: "https://www.booking.com/hotel/pt/pousada-de-juventude-de-foz-do-cavado.en-gb.html?aid=1447648;label=AlberguePorto;sid=c4dc12d41b948ab9741aa73085908611;checkin=2021-04-19;checkout=2021-04-20;dest_id=-2164801;dest_type=city;dist=0;from_beach_key_ufi_sr=1;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;room1=A%2CA;sb_price_type=total;soh=1;sr_order=popularity;srepoch=1618741742;srpvid=1a9949b6a2bb0189;type=total;ucfs=1&#no_availability_msg",
        type: "",
        position: [41.51134140017021, -8.76750644401635]
    },
    {
        name: "Fão",
        description: "The Spot Hostel Ofir",
        phoneNumber: "+351 934 324 426",
        externalLink: "https://www.spot-hostel-ofir.com/",
        type: "",
        position: [41.51035703052548, -8.771744430525786]
    },
    {
        name: "Esposende",
        description: "Hostel Sleep&Go",
        phoneNumber: "+351 253 173 121",
        type: "",
        position: [41.52206839531178, -8.77147632055516]
    },
    {
        name: "Esposende",
        description: "Hostel Eleven",
        phoneNumber: "+351 253 039 303",
        externalLink: "http://www.hosteleleven.pt",
        type: "",
        position: [41.5304413340232, -8.779794857506426]
    },
    {
        name: "Esposende",
        description: "InnEsposende Sports Hostel",
        phoneNumber: "+351 932 466 542",
        externalLink: "http://www.innesposende.com/",
        type: "",
        position: [41.53097310582597, -8.781783259361646]
    },
    {
        name: "Marinhas",
        description: "Casa do Avô Grande",
        phoneNumber: "+351919752342",
        type: "",
        position: [41.570724572264204, -8.78294655936054]
    },
    {
        name: "Anha",
        description: "Albergue Casa da Carolina",
        phoneNumber: "+351 969 004 514",
        externalLink: "http://facebook.com/casadacarolina19",
        type: "",
        position: [41.66698847567445, -8.799057444012046]
    },
    {
        name: "Darque",
        description: "Camping Orbitur Viana do Castelo",
        phoneNumber: "+351 258 322 167",
        externalLink: "https://www.google.pl/aclk?sa=L&ai=CY-VjwQt8YJLODqXAxgKf1p7QA7-8kpZY6amFw-cMgPHjvcoiCAoQASAAKAdg7QSCAR9nb29nbGVtb2Rlcy1kZXNrdG9wLW1hcHMtaG90ZWxzqQIma9RDNBq0PqgDBaoEKk_Qpm61VaaFwrZhGn7aA4VYUVwMPEwr6Z3V2sWOuEo7laIA_-hCmqn7D8AEiqmi_qEDiAW6sfuNGMAFkgGgBmWIBwGQBwKoB_DZG8gJrAGiCnYKCjIwMjEtMDQtMTkQASkJg19Rg502nDITYm9va2luZy5jb21TdGFuZGFyZDgASAFSAF10SJFCZcF4i0ByA0VVUoIBAIoBBXZhcl9wsAEBuAEAyAH_zeQv4AEB6AEB8AEB-AEAoAIA4AIA6gIDRVVS8AIBigMA6AoBkAsD0Asb0BUBgBcB&sig=AOD64_1liG6uoQ-A8dvMJaE0OpSt9Ur5mA&adurl=https://www.booking.com/hotel/pt/parque-de-campismo-orbitur-viana-do-castelo.html?aid%3D1893447%26label%3Dmetagha-link-mapresultsPT-hotel-2259153_dev-desktop_los-1_bw-1_dow-Monday_defdate-1_room-0_lang-en_curr-EUR_gstadt-2_rateid-var_p_aud-1046869801_cid-_gacid-6471735482_mcid-10_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20210419%26checkin%3D2021-04-19%26checkout%3D2021-04-20%26group_adults%3D2%26show_room%3D%26lang%3Den%26selected_currency%3DEUR%26exrt%3D1.00000000%26ext_price_total%3D77.00%26ext_price_tax%3D4.36%26xfc%3DEUR%26group_children%3D0%26req_children%3D0%26%26utm_source%3Dmetagha%26utm_medium%3Dmapresults%26utm_campaign%3DPT%26utm_term%3Dhotel-2259153%26utm_content%3Ddev-desktop_los-1_bw-1_dow-Monday_defdate-1_room-0_lang-en_curr-EUR_gstadt-2_rateid-var_p_aud-1046869801_cid-_gacid-6471735482_mcid-10_ppa-0_clrid-0_ad-1_gstkid-0_checkin-20210419",
        type: "",
        position: [41.86639, -8.85984]
    },
    {
        name: "Carreço",
        description: "Albergue Casa do Sardão",
        phoneNumber: "+351 961 790 759",
        externalLink: "https://www.booking.com/hotel/pt/albergue-casa-do-sardao.en-gb.html?aid=1447648&label=AlberguePorto&sid=c4dc12d41b948ab9741aa73085908611&all_sr_blocks=225065501_142495453_0_0_0%2C225065501_142495453_0_0_0&checkin=2021-04-19&checkout=2021-04-20&dest_id=-2161527&dest_type=city&group_adults=2&group_children=0&hapos=1&highlighted_blocks=225065501_142495453_0_0_0%2C225065501_142495453_0_0_0&hpos=1&no_rooms=1&sr_order=popularity&sr_pri_blocks=225065501_142495453_0_0_0__1300%2C225065501_142495453_0_0_0__1300&srepoch=1618742468&srpvid=d7cc4b2111d600f5&ucfs=1&from=searchresults;highlight_room=#hotelTmpl",
        type: "",
        position: [41.75492967235432, -8.861609357500267]
    },
    {
        name: "Vila Praia de Âncora",
        description: "Guest House D'Avenida",
        phoneNumber: "+351965226360",
        externalLink: "http://www.guesthousedavenida.com/",
        type: "",
        position: [41.81489787779965, -8.866094572844421]
    },
    {
        name: "Moledo",
        description: "Hostel Caracóis e Borboletas",
        phoneNumber: "+351 932 330 524",
        externalLink: "http://www.hostelcaracoiseborboletas.com/",
        type: "",
        position: [41.85107522192745, -8.859615901679947]
    },
    {
        name: "Caminha",
        description: "Camping Orbitur Caminha",
        phoneNumber: "+351 258 921 295",
        externalLink: "https://www.orbitur.pt/es/destinos/regiao-norte/orbitur-caminha",
        type: "",
        position: [41.866622833966595, -8.858542759352428]
    },
    {
        name: "Caminha",
        description: "Arca Nova Guest House & Hostel",
        phoneNumber: "+351 935 390 402",
        externalLink: "http://www.arcanova.pt/",
        type: "",
        position: [41.87415157794357, -8.836224772842828]
    },
    {
        name: "Seixas",
        description: "Albergue S. Bento",
        phoneNumber: "+351 966 437 532",
        externalLink: "https://www.facebook.com/Albergue-SBento-113208323486032/",
        type: "",
        position: [41.89628437280524, -8.817506788188078]
    },
    {
        name: "Vila Nova de Cerveira",
        description: "Pilgrims Rest",
        phoneNumber: "+351 968 819 606",
        type: "",
        position: [41.93326998956278, -8.743883259350524]
    },
    {
        name: "Vila Nova de Cerveira",
        description: "Casa Gwendoline",
        phoneNumber: "+351 963 528 441",
        externalLink: "http://casagwendoline.com/",
        type: "",
        position: [41.932545462314415, -8.743276374696443]
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
            <MapContainer center={accomodations[19].position} preferCanvas={true} zoom={9} scrollWheelZoom={true} 
            style={{
                width: '100%',
                height: `100%`,
                border: '0px'
            }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapDetailsContent items={accomodations}>
                {accomodations.map((item: MapItem, index: number) => {
                    return (
                        <PortaledMarker
                            icon={yellowIcon}
                            index={index}
                            outerIndex={index}
                            keyy={'co'.repeat(index+1)}
                            item={item}
                            prefix={'coast'} 
                        />
                    );
                })}
            </MapDetailsContent>
          </MapContainer>
        }
        </DeviceContextConsumer>
    );
}
