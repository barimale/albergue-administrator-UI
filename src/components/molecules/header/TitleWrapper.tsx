import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

export const TitleWrapper = (props: any) => (
  <DeviceContextConsumer>
    {(context) => (
      <div
        {...props}
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: context === DeviceType.isDesktopOrLaptop ? 'center' : 'center',
          backgroundColor: 'transparent',
          alignItems: 'start',
          width: context === DeviceType.isDesktopOrLaptop ? '100%' : 'auto',
          height: 'inherit',
          left: context === DeviceType.isDesktopOrLaptop ? 'unset' : '50%',
          position: context === DeviceType.isDesktopOrLaptop ? 'relative' : 'absolute',
          WebkitTransform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)',
          transform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)',
        }}
      >
        {props.children}
      </div>
    )}
  </DeviceContextConsumer>
);
