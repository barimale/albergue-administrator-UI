import React from 'react';
import { DeviceContextConsumer, DeviceType } from "../../../contexts/DeviceContext";
import { useRef } from 'react';
import useOverEffectHook from '../../../hooks/useOverEffectHook';

export const Logo = (props: any) => {
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);

  return (
    <DeviceContextConsumer>
      {context => <div
        {...props}
        style={{
          display: 'flex',
          width: 'auto',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.2s, height 0.2s',
          WebkitTapHighlightColor: 'transparent',
        }}>
        <img
          ref={hoverRef}
          src={'/logo.webp'}
          alt={"logo"}
          style={{
            border: context === DeviceType.isDesktopOrLaptop ? '3px white solid' : '1px white solid',
            borderRadius: '50%',
            cursor: 'pointer',
            opacity: opacityValue,
            WebkitTapHighlightColor: 'transparent',
            height: context === DeviceType.isDesktopOrLaptop ? '40px' : `${42 - 2}px`,
            objectFit: 'scale-down'
          }} />
      </div>}
    </DeviceContextConsumer>
  );
};
