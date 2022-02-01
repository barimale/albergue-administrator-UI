import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import SecuredRoutes from './routes/SecuredRoutes';
import { DeviceContextConsumer, DeviceType } from './contexts/DeviceContext';

function SecuredApp () {
  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          className="App"
          style={{
            scale: context.valueOf() === DeviceType.isTabletOrMobile ? '0.5' : 'unset',
          }}
        >
          <BrowserRouter>
            <MainLayout>
              <SecuredRoutes />
            </MainLayout>
          </BrowserRouter>
        </div>
      )}
    </DeviceContextConsumer>
  );
}

export default SecuredApp;
