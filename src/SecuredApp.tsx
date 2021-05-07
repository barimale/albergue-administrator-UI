import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CustomMuiThemeProvider from './customTheme';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { MainLayout } from './components/templates/MainLayout';
import SecuredRoutes from './routes/SecuredRoutes';
import { BrowserRouter } from 'react-router-dom';

function SecuredApp() {  
  
  return (
    <div className="App">
      <CustomMuiThemeProvider>
        <I18nextProvider i18n={i18n}>
          <DeviceContextProvider>
            <BrowserRouter>
              <MainLayout>
                <SecuredRoutes/>
              </MainLayout>
            </BrowserRouter>
          </DeviceContextProvider>
        </I18nextProvider>
      </CustomMuiThemeProvider>
    </div>
  );
}

export default SecuredApp;
