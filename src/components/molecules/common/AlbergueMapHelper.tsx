import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useMap } from 'react-leaflet';
import { LatLngTuple } from "leaflet";
import L from 'leaflet';
import 'leaflet.awesome-markers';
import '@fortawesome/free-solid-svg-icons';
import { MapItem } from '../../atoms/MapItem';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { WebLinkTo } from './WebLinkTo';
import { PhoneToMobileInPopup } from './PhoneToMobile';
import { LoadingInProgress } from './LoadingInProgress';
import { PortaledMarkerWithChildren } from './PortaledMarker';

export const delayInMilliseconds = 300;

export var albergueIcon = new L.AwesomeMarkers.Icon({
    icon: 'home',
    prefix: 'fa',
    markerColor: 'darkred',
    iconColor: 'white',
});

function defaultIcon (color: 'red' | 'darkred' | 'orange' | 'green' | 'darkgreen' | 'blue' | 'purple' | 'darkpurple' | 'cadetblue'){
    return new L.AwesomeMarkers.Icon({
            icon: 'circle',
            // 'map-marker-alt'
            prefix: 'fa',
            markerColor: color,
            iconColor: 'white',
            extraClasses: 'fas'
        });
}

export const greenIcon = defaultIcon('green');
export const orangeIcon = defaultIcon('orange');
export const yellowIcon = defaultIcon('darkgreen');
export const purpleIcon = defaultIcon('cadetblue');
export const blueIcon = defaultIcon('blue');

export const position: LatLngTuple = [41.1597588, -8.6208183];

export const AlbergueMapItem: MapItem = {
    name: "Albergue",
    description: 'albergue',
    type: "albergue",
    position: position
};


export const AlbergueMarker = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <DeviceContextConsumer>
            {context => 
            <PortaledMarkerWithChildren
                index={0}
                outerIndex={0}
                keyy={'alf'.repeat(1)}
                position={position}
                prefix={'albergueflyer'}
                icon={albergueIcon}
            >
                <AlbergueFlyer/>
            </PortaledMarkerWithChildren>
        }
        </DeviceContextConsumer>
    );
};

const AlbergueFlyer = () =>{
    const { t } = useTranslation();
    const theme = useTheme();
    const [isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, delayInMilliseconds);
    },[]);

    return (
        <DeviceContextConsumer>
        {context => 
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                {isLoading.valueOf() === true ? (
                    <LoadingInProgress/>
                ):(
                <>
                    <img 
                        style={{
                            height: context.valueOf() === DeviceType.isDesktopOrLaptop? '40px' : '30px',
                            width: 'auto',
                            alignSelf: 'center',
                            padding: '0px',
                            paddingLeft: '0px'
                        }}
                        src={"/logo.webp"} 
                        alt={"logo"}
                    />
                    <div>
                        <Typography
                            align={'center'}
                            style={{
                                paddingLeft: '0px',
                                margin: '0px',
                                color: `${theme.palette.common.black}`,
                                WebkitTapHighlightColor: 'transparent',
                                fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                                textAlign: 'center',
                                fontFamily: 'Signoria-Bold',
                            }}>
                            {t("Header title.Line1")}
                        </Typography>
                        <Typography
                            align={'center'}
                            style={{
                                paddingLeft: '0px',
                                margin: '0px',
                                color: `${theme.palette.common.black}`,
                                WebkitTapHighlightColor: 'transparent',
                                fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                                textAlign: 'center',
                                fontFamily: 'Signoria-Bold'
                            }}>
                            {t("Header title.Line2")}
                        </Typography>
                        <Typography
                            align={'center'}
                            style={{
                                paddingLeft: '0px',
                                margin: '0px',
                                color: `${theme.palette.common.black}`,
                                WebkitTapHighlightColor: 'transparent',
                                fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                                textAlign: 'center',
                                fontFamily: 'Signoria-Bold'
                            }}>
                            {t("Header title.Line3")}
                        </Typography>                      
                    </div>
                </>
            )}
            </div>
        }
        </DeviceContextConsumer>
    );
}

type MapDetailsContentProp = {
    items: MapItem[];
}

export const MapDetailsContent = (props: PropsWithChildren<MapDetailsContentProp>) =>{
    const { items: externals } = props;
    const items = [...externals, AlbergueMapItem];
    const map = useMap();

    map.whenReady(()=>{
        var flatten: LatLngTuple[] = items.flatMap((p:MapItem) => {
            return [p.position]
        });
        var bounds = L.latLngBounds(flatten);

        map.fitBounds(bounds);
        map.invalidateSize();
    });


    return(
        <DeviceContextConsumer>
        {context =>
            <>
                {props.children}
                <AlbergueMarker />
            </>
        }
        </DeviceContextConsumer>
    );
}

export type MapItemPopupContentProps = {
    item: MapItem;
}

export const MapItemPopupContent = (props: MapItemPopupContentProps) =>{
    const { item } = props;
    const { t } = useTranslation();
    const theme = useTheme();
    const [isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, delayInMilliseconds);
    },[])

    return(
        <DeviceContextConsumer>
        {context =>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
            }}>
                {isLoading.valueOf() === true ? (
                    <LoadingInProgress/>
                ):(
                    <>
                <Typography
                    style={{
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '12px',
                        paddingLeft: '0px',
                        margin: '0px',
                        fontWeight: 'bold',
                        fontFamily: 'Signoria-Bold',
                        color: `${theme.palette.common.black}`,
                }}>
                    {t(item.name)}
                </Typography>
                {item.description !== undefined && (
                    <Typography
                    style={{
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                        paddingLeft: '0px',
                        margin: '0px',
                        color: `${theme.palette.common.black}`,
                        paddingBottom: '5px',
                        fontFamily: 'Signoria-Bold',
                    }}>  
                        {t(item.description)}
                    </Typography>
                )}
                <ul
                    className={"facility-list"}
                    style={{
                    fontFamily: 'Signoria-Bold',
                    listStyleType: 'none',
                    padding: '0px',
                    textAlign: 'left',
                }}>
                    <>      
                    {item.phoneNumber !== undefined && (
                        <li><PhoneToMobileInPopup showLong={true} phoneNumber={item.phoneNumber || ""} /></li>
                    )}
                    {item.externalLink !== undefined && (
                        <li><WebLinkTo showLong={true} url={item.externalLink || ""}/></li>
                    )}
                    </>
                </ul>
                </>
                )}
            </div>
        }
        </DeviceContextConsumer>
    );
}