/* eslint-disable no-undef */
import React from 'react';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';

type PaperProps = {
    content: JSX.Element;
    title: JSX.Element;
}

export default function Paper (props: PaperProps) {
  const { content, title } = props;

  return (
    <DeviceContextConsumer>
      {() => (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          padding: '0px',
          width: '100%',
          height: 'inherit',
          margin: '0px',
          backgroundColor: 'transparent',
        }}
        >
          {title}
          <div
            style={{
              backgroundColor: 'transparent',
              height: '100%',
              width: '100%',
              padding: '0px',
              scrollBehavior: 'smooth',
              overflowY: 'auto',
            }}
          >
            {content}
          </div>
        </div>
      )}
    </DeviceContextConsumer>
  );
}
