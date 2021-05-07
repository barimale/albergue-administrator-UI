import React from 'react';
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";

export const LogoWrapper = (props: any) => {
  return (
    <DeviceContextConsumer>
      {context => <div
        {...props}
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: context === DeviceType.isDesktopOrLaptop ? 'center' : 'center',
          backgroundColor: 'transparent',
          alignItems: 'center',
          alignContent: 'center',
          width: props.siderWidth,
          height: '100%'
        }}>
        {props.children}
      </div>}
    </DeviceContextConsumer>
  );
};
