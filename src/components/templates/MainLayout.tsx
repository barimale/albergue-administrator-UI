import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useLocation, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import Header from '../organisms/Header';

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const MainBackground = (props: any) => {
  const theme = useTheme();

  return (
    <div
      {...props}
      style={{
        backgroundColor: `${theme.palette.secondary.light}`,
        height: props?.style?.height !== undefined ? props?.style?.height : 'inherit',
        width: props?.style?.width !== undefined ? props?.style?.width : 'inherit',
      }}
    >
      {props.children}
    </div>
  );
};

export const MainLayout = (props : any) => {
  const { innerHeight: height } = window;

  const [paddingTop, setPaddingTop] = useState<number>(0);
  const [footerHeight] = useState<number>(0);
  const [siderWidth] = useState<number>(0);

  const isPortrait = useMediaQuery({
    orientation: 'portrait',
  });
  const prevVal = usePrevious(isPortrait);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.replace(location.pathname);
  }, [window.screen.width, window.screen.height]);

  useEffect(() => {
    if (prevVal === undefined) {
      return;
    }

    if (isPortrait !== prevVal) {
      history.replace(location.pathname);
    }
  }, [isPortrait, prevVal]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <Header
            onSize={(size: any) => {
              setPaddingTop(size.height || 0);
            }}
            siderWidth={siderWidth}
          />
          <div style={{
            height: height - paddingTop - footerHeight,
            width: '100%',
            paddingTop,
            paddingBottom: footerHeight,
            overflow: 'hidden',
          }}
          >

            {context.valueOf() === DeviceType.isDesktopOrLaptop ? (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 'inherit',
                width: '100%',
              }}
              >
                <MainBackground style={{
                  height: 'inherit', width: '100%',
                }}
                >
                  {props.children}
                </MainBackground>
              </div>
            ) : (
              <MainBackground>
                {props.children}
              </MainBackground>
            )}
          </div>
        </>
      )}
    </DeviceContextConsumer>
  );
};

export const ContentLayout = (props: any) => (
  <div
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: 'inherit',
      height: 'inherit',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingBottom: '10px',
      transition: 'all 0.4s ease',
      msTransition: 'all 0.4s ease',
      MozTransition: 'all 0.4s ease',
      WebkitTransition: 'all 0.4s ease',
    }}
  >
    {props.children}
  </div>
);

export const ContentLayout2 = (props: any) => (
  <div
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: 'inherit',
      height: 'inherit',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      backgroundColor: 'tansparent',
      transition: 'all 0.4s ease',
      msTransition: 'all 0.4s ease',
      MozTransition: 'all 0.4s ease',
      WebkitTransition: 'all 0.4s ease',
    }}
  >
    {props.children}
  </div>
);
