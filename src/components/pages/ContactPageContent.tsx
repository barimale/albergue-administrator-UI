import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Title } from "../screens/ContactPage";
import { LocationAdvice } from "../molecules/common/LocationAdvice";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import Paper from '../molecules/common/Paper';
import { position, albergueIcon, delayInMilliseconds } from '../molecules/common/AlbergueMapHelper';
import React, { createRef, useEffect, useRef } from 'react';
import { PortaledMarkerWithChildren } from '../molecules/common/PortaledMarker';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';

export default function ContactPageContent(){
    return (
        <Content/>
    );
}

const Content = () =>{
    const theme = useTheme();
    const { t } = useTranslation();

    return(
        <DeviceContextConsumer>
        {context =>
              <Paper 
               title={
                    <Typography
                        align={context === DeviceType.isDesktopOrLaptop ? "center" : 'center'}
                        style={{
                            fontStyle: 'normal',
                            fontWeight: 600,
                            width: '100%',
                            whiteSpace: 'break-spaces',
                            color: `${theme.palette.common.black}`,
                            WebkitTapHighlightColor: 'transparent',
                            fontSize: context === DeviceType.isDesktopOrLaptop ? '32px':'20px',
                            textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'center',
                            fontFamily: 'Signoria-Bold',
                            paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px': 'unset',
                            paddingTop: context === DeviceType.isDesktopOrLaptop ? '10px': 'unset',
                            paddingBottom: context === DeviceType.isDesktopOrLaptop ? '10px': 'unset',
                    }}>
                        {t(Title).toUpperCase()}
                    </Typography>
               }
               content={
                    <MapDetails />
               } />
            }
        </DeviceContextConsumer>
    );
}

const MapDetails = (props: any) =>{
    // const ref = createRef<L.Marker>();

    // useEffect(()=>{
    //     const node = ref.current;

    //     if(node){
    //         node.openPopup();
    //     }

    // }, [ref]);

    return(
        <DeviceContextConsumer>
        {context =>
            <MapContainer 
            {...props}
            center={position} 
            preferCanvas={true} 
            zoom={17} 
            scrollWheelZoom={true} 
            style={{
                width: '100%',
                height: `100%`,
                border: '0px'
            }}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PortaledMarkerWithChildren
                    index={0}
                    outerIndex={0}
                    keyy={'al'.repeat(1)}
                    position={position}
                    prefix={'albergue'}
                    icon={albergueIcon}
                >
                    <AlbergueDetailed/>
                </PortaledMarkerWithChildren>
            </MapContainer>
        }
        </DeviceContextConsumer>
    );
}

const AddressDetails = (props: any) =>{
    return(
        <div 
        {...props}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'left',
            borderRadius: '10px',
            width: 'max-content'
        }}>
            <LocationAdvice />
        </div>
    );
}

const AlbergueDetailed = () =>{
    const { t } = useTranslation();
    const theme = useTheme();
    const [isLoading, setIsLoading ] = React.useState<boolean>(true);

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
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignContent: 'left',
            width: '240px'
        }}>
            {isLoading.valueOf() === true ? (
                <LoadingInProgress/>
            ):(
                <ul 
                    className={"facility-list"}
                    style={{
                        listStyleType: 'none',
                        paddingLeft: '0px',
                        maxWidth: context === DeviceType.isDesktopOrLaptop ? '240px' : '140px'
                }}>
                    <li>
                        <Typography 
                        style={{
                            fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                            paddingLeft: '0px',
                            margin: '0px',
                            color: `${theme.palette.common.black}`,
                            paddingBottom: '10px',
                            fontWeight: 'bold'
                        }}>
                            {`${t("Our location")}:`}
                        </Typography>
                    </li>
                    <li>
                        <AddressDetails style={{paddingBottom: '10px'}}/>
                    </li>
                    <li>
                        <Typography 
                        style={{
                            fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                            paddingLeft: '0px',
                            margin: '0px',
                            color: `${theme.palette.common.black}`,
                            fontWeight: 'bold',
                            paddingTop: '10px'
                        }}>
                            {t("Use Google Maps features")}
                        </Typography>
                    </li>
                    <li>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'space-evenly'
                        }}>
                            <a href={"https://www.google.com/maps/dir//41.1597963,-8.6207608/@41.159796,-8.620761,16z?hl=en"}
                                    target="_blank"
                                className="pointerOverEffect"
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <CallSplitIcon/>
                                    {t("Directions")}
                                </div>
                            </a>
                            <a href={"https://www.google.com/maps?ll=41.159796,-8.620761&z=16&t=m&hl=en&gl=PT&mapclient=embed&cid=15903323997097091884"}
                            target="_blank"
                            className="pointerOverEffect"
                            style={{paddingTop: '10px'}}
                            >
                                {t("View larger map")}
                            </a>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    }
    </DeviceContextConsumer>
    );
}