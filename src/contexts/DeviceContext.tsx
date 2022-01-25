/* eslint-disable no-unused-vars */
import React from 'react';
import { useMediaQuery } from 'react-responsive';

export enum DeviceType{
    isDesktopOrLaptop,
    isTabletOrMobile
}

const DeviceContext = React.createContext(DeviceType.isDesktopOrLaptop);

const DeviceContextConsumer = DeviceContext.Consumer;

const DeviceContextProvider = (props: any) => {
  const isLandscape = useMediaQuery({
    orientation: 'landscape',
  });
  const isDesktopOrLaptop = useMediaQuery({
    minDeviceWidth: 1024,
  });
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1023,
  });
  const isSmallMobileDevice = useMediaQuery({
    maxDeviceWidth: 400,
  });

  function ObtainType (): DeviceType {
    if (isDesktopOrLaptop
        || (isTabletOrMobileDevice && isLandscape && (isSmallMobileDevice === false))) {
      return DeviceType.isDesktopOrLaptop;
    }

    if (isTabletOrMobileDevice) {
      return DeviceType.isTabletOrMobile;
    }

    return DeviceType.isDesktopOrLaptop;
  }

  return <DeviceContext.Provider value={ObtainType()}>{props.children}</DeviceContext.Provider>;
};

export {
  DeviceContextProvider, DeviceContextConsumer, DeviceContext,
};
