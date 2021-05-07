import { Redirect, Route, Switch } from 'react-router-dom';
import { ReservationScreen, Path as LoginPath } from "../components/screens/ReservationPage";
import { appBaseRouteKey } from './RouterConfiguration';

export const HomePath = "/app";

export default function SecuredRoutes(){
    return(
        <Switch>
            <Route exact path={appBaseRouteKey + HomePath} render={() => <ReservationScreen />} />
            {/* <Route exact path={appBaseRouteKey + ReservationPath} render={() => <ReservationScreen/>} />
            <Route exact path={appBaseRouteKey + GalleryPath} render={() => <GalleryPage/>} />
            <Route exact path={appBaseRouteKey + ActivitiesPath} render={() => <ActivitiesPage />} />
            <Route exact path={appBaseRouteKey + AroundPortoPath} render={() => <AroundPortoPage/>} />
            <Route exact path={appBaseRouteKey + ContactPath} render={() => <ContactPage/>} />
            <Route exact path={appBaseRouteKey + TheWayPath} render={() => <TheWayPage/>} /> */}
            {/* <Route exact path={appBaseRouteKey + ShopPath} render={() => <ShopPage/>} /> */}
            <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
        </Switch>
    );
}