import { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { LoginPage, Path as LoginPath } from "../components/screens/LoginPage";
import { AuthContext } from '../contexts/AuthContext';

export const HomePath = "/";
export const appBaseRouteKey = "";

export default function Routes(){
    const {isSignedIn} = useContext(AuthContext);
    const history = useHistory();
    
    useEffect(() => {
        if(isSignedIn.valueOf() === true){
            history.push('/app/');
        }
    }, [isSignedIn]);

    return(
        <Switch>
            <Route exact path={appBaseRouteKey + LoginPath} render={() => <LoginPage />} />
            <Route render={() => <Redirect to={appBaseRouteKey + LoginPath} />} />
        </Switch>
    );
}