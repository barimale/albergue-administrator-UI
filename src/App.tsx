import './App.css';
import i18n from './i18n';
import React, { useEffect } from 'react';
import { LoadingInProgress } from "./components/molecules/common/LoadingInProgress";
import LocalizedApp from "./LocalizedApp";

function App() {  
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(()=>{
    if(i18n.isInitialized === false){
      i18n.init();
    }

    setIsLoading(false);
  }, []);
  
  return (
    <>
      {isLoading.valueOf() === true ?(
        <div className="App">
          <LoadingInProgress/>
        </div>
      ):(
        <LocalizedApp />
      )}
    </>
  );
}

export default App;
