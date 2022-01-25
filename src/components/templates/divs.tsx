import React from 'react';

export const TopDiv = (props: any) => {
  const backgroundColor: string = props.style !== undefined ? props.style.backgroundColor : 'unset';

  return (
    <div
      {...props}
      style={{
        backgroundColor,
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {props.children}
    </div>
  );
};

export const CenteredDiv = (props: any) => {
  const backgroundColor: string = props.style !== undefined ? props.style.backgroundColor : 'unset';
  const verticalAlign: string = props.style !== undefined ? props.style.verticalAlign : 'center';

  return (
    <div
      {...props}
      style={{
        backgroundColor,
        display: 'flex',
        justifyContent: 'space-around',
        verticalAlign,
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {props.children}
    </div>
  );
};
