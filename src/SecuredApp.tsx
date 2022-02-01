import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import SecuredRoutes from './routes/SecuredRoutes';
import { DeviceContextConsumer } from './contexts/DeviceContext';

function SecuredApp () {
  return (
    <DeviceContextConsumer>
      {() => (
        <div
          className="App"
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
