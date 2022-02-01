/* eslint-disable no-nested-ternary */
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Routes from './routes/Routes';
import { LoadingInProgress } from './components/molecules/common/LoadingInProgress';
import SecuredApp from './SecuredApp';
import { DeviceContextConsumer, DeviceType } from './contexts/DeviceContext';

function LocalizedApp () {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | undefined>(undefined);
  const { isSignedIn } = useContext(AuthContext);

  useEffect(() => {
    setIsLoggedIn(isSignedIn);
  }, [isSignedIn]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        context.valueOf() === DeviceType.isTabletOrMobile ? (
          <p>Mobile and Tablet not supported.</p>
        ) : (
          isLoggedIn === undefined ? (
            <div
              className="App"
            >
              <LoadingInProgress />
            </div>
          ) : (
            <>
              {isLoggedIn && (
              <SecuredApp />
              )}
              {!isLoggedIn && (
              <div
                className="App"
              >
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
              </div>
              )}
            </>
          ))
      )}
    </DeviceContextConsumer>
  );
}

export default LocalizedApp;
