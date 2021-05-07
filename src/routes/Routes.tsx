import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage, Path as LoginPath } from "../components/screens/LoginPage";

export const HomePath = "/";
export const appBaseRouteKey = "/";

export default function Routes(){
    return(
        <Switch>
            <Route exact path={appBaseRouteKey + LoginPath} render={() => <LoginPage />} />
            <Route render={() => <Redirect to={appBaseRouteKey + LoginPath} />} />
        </Switch>
    );
}