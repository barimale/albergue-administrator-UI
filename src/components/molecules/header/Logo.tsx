import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

export const Logo = (props: any) => (
  <DeviceContextConsumer>
    {(context) => (
      <div
        {...props}
        style={{
          display: 'flex',
          width: 'auto',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.2s, height 0.2s',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <img
          src="/logo.webp"
          alt="logo"
          style={{
            border: context === DeviceType.isDesktopOrLaptop ? '3px white solid' : '1px white solid',
            borderRadius: '50%',
            WebkitTapHighlightColor: 'transparent',
            height: context === DeviceType.isDesktopOrLaptop ? '55px' : `${42 - 2}px`,
            objectFit: 'scale-down',
          }}
        />
      </div>
    )}
  </DeviceContextConsumer>
);
