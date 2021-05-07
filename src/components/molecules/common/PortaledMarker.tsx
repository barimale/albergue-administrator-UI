import { Marker, Popup } from 'react-leaflet';
import { MapItemPopupContent } from './AlbergueMapHelper';
import { MapItem } from "../../atoms/MapItem";
import PopupEntry from './PopupEntry';
import React, { PropsWithChildren, useRef } from 'react';
import { isMacOs, isMobileSafari, isIPad13, isIOS } from 'react-device-detect';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

type PortaledMarkerProps = {
    index: number;
    outerIndex: number;
    keyy: string;
    item: MapItem;
    prefix: string;
    icon: L.DivIcon | L.Icon;
};

export const PortaledMarker = (props: PortaledMarkerProps) => {
    const isApple = [isMacOs, isMobileSafari, isIPad13, isIOS].some(p => p === true);

    return (
        <>
            {isApple.valueOf() === true ? (
                <ApplePortaledMarker {...props} />
                ):(
                <AndroidPortaledMarker {...props} />
            )}
        </>
    );
};

const AndroidPortaledMarker = (props: PortaledMarkerProps) => {
    const { outerIndex, item, keyy, prefix, index, icon } = props;

    return (
    <DeviceContextConsumer>
    {context =>
        <>
            <Marker
                key={index * outerIndex + index}
                position={item.position}
                icon={icon}>
                <Popup closeOnClick={false} >
                    <div 
                        id={`${keyy}-${prefix}-popup`} 
                        style={{width: context.valueOf() === DeviceType.isDesktopOrLaptop ? "180px" : '150px'
                    }}>
                        <MapItemPopupContent item={item} />
                    </div>
                </Popup>
            </Marker>
            <PopupEntry parentId={`#${keyy}-${prefix}-popup`}>
                <MapItemPopupContent item={item} />
            </PopupEntry>
        </>
    }
    </DeviceContextConsumer>
    );
};

const ApplePortaledMarker = (props: PortaledMarkerProps) => {
    const { outerIndex, item, keyy, prefix, index, icon } = props;
    const refToMarker = useRef<L.Marker>(null);
    
    return (
    <DeviceContextConsumer>
    {context =>
        <>
            <Marker
                ref={refToMarker}
                key={index * outerIndex + index}
                position={item.position}
                icon={icon}
                eventHandlers={{
                    click: () => {
                        const node = refToMarker.current;
                        if(node){
                            node.openPopup();
                        }
                    }
                }}>
                <Popup closeOnClick={false}>
                    <div 
                        id={`${keyy}-${prefix}-popup`} 
                        style={{width: context.valueOf() === DeviceType.isDesktopOrLaptop ? "180px" : '150px'
                    }}>
                        <MapItemPopupContent item={item} />
                    </div>
                </Popup>
            </Marker>
            <PopupEntry parentId={`#${keyy}-${prefix}-popup`}>
                <MapItemPopupContent item={item} />
            </PopupEntry>
        </>
    }
    </DeviceContextConsumer>
    );
};

type PortaledMarkerWithChildrenProps = {
    index: number;
    outerIndex: number;
    keyy: string;
    position: L.LatLngTuple;
    prefix: string;
    icon: L.Icon | L.DivIcon;
};

export const PortaledMarkerWithChildren = (props: PropsWithChildren<PortaledMarkerWithChildrenProps>) => {
    const isApple = [isMacOs, isMobileSafari, isIPad13, isIOS].some(p => p === true);

    return (
        <>
            {isApple.valueOf() === true ? (
                <ApplePortaledMarkerWithChildren {...props} />
                ):(
                <AndroidPortaledMarkerWithChildren {...props} />
            )}
        </>
    );
};

const AndroidPortaledMarkerWithChildren = (props: PropsWithChildren<PortaledMarkerWithChildrenProps>) => {
    const { outerIndex, position, keyy, prefix, index, children, icon } = props;
    return (
    <DeviceContextConsumer>
    {context =>
        <>
            <Marker
                key={index * outerIndex + index}
                position={position}
                icon={icon}>
                <Popup closeOnClick={false}>
                    <div 
                        id={`${keyy}-${prefix}-popup`} 
                        style={{width: context.valueOf() === DeviceType.isDesktopOrLaptop ? "180px" : '150px'
                    }}>
                        {children}
                    </div>
                </Popup>
            </Marker>
            <PopupEntry parentId={`#${keyy}-${prefix}-popup`}>
                {children}
            </PopupEntry>
        </>
    }
    </DeviceContextConsumer>
    );
};

const ApplePortaledMarkerWithChildren = (props: PropsWithChildren<PortaledMarkerWithChildrenProps>) => {
    const { outerIndex, position, keyy, prefix, index, children, icon } = props;
    const refToMarker = useRef<L.Marker>(null);

    return (
        <DeviceContextConsumer>
        {context =>
            <>
                <Marker
                    ref={refToMarker}
                    key={index * outerIndex + index}
                    position={position}
                    icon={icon}
                    eventHandlers={{
                        click: () => {
                            const node = refToMarker.current;
                            if(node){
                                node.openPopup();
                            }
                        }
                    }}>
                    <Popup closeOnClick={false}>
                        <div 
                            id={`${keyy}-${prefix}-popup`}
                            style={{width: context.valueOf() === DeviceType.isDesktopOrLaptop ? "180px" : '150px'
                        }}>
                            {children}
                        </div>
                    </Popup>
                </Marker>
                <PopupEntry parentId={`#${keyy}-${prefix}-popup`}>
                    {children}
                </PopupEntry>
            </>
        }
        </DeviceContextConsumer>
    );
};
