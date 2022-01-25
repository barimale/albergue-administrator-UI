import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

export const LogoWrapper = (props: any) => (
  <DeviceContextConsumer>
    {(context) => (
      <div
        {...props}
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: context === DeviceType.isDesktopOrLaptop ? 'center' : 'center',
          backgroundColor: 'transparent',
          alignItems: 'center',
          alignContent: 'center',
          width: 'auto',
          height: '100%',
        }}
      >
        {props.children}
      </div>
    )}
  </DeviceContextConsumer>
);
