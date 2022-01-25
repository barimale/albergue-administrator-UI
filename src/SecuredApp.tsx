import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import SecuredRoutes from './routes/SecuredRoutes';

function SecuredApp () {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <SecuredRoutes />
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default SecuredApp;
