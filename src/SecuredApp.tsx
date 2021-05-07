import './App.css';
import { MainLayout } from './components/templates/MainLayout';
import SecuredRoutes from './routes/SecuredRoutes';
import { BrowserRouter } from 'react-router-dom';

function SecuredApp() {  
  
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <SecuredRoutes/>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default SecuredApp;
