import { Redirect, Route, Switch } from 'react-router-dom';

import { ReservationScreen, Path as ReservationPath } from '../components/screens/ReservationPage';
import { GalleryPage, Path as GalleryPath } from '../components/screens/GalleryPage';
import { ActivitiesPage, Path as ActivitiesPath } from "../components/screens/ActivitiesPage";
import { ShopPage, Path as ShopPath } from '../components/screens/ShopPage';
import { TheWayPage, Path as TheWayPath } from '../components/screens/TheWayPage';
import { ContactPage, Path as ContactPath } from '../components/screens/ContactPage';
import { AroundPortoPage, Path as AroundPortoPath } from '../components/screens/AroundPortoPage';
import { WelcomeScreen } from '../components/screens/WelcomePage';
import { appBaseRouteKey } from './RouterConfiguration';

export const HomePath = "/";

export default function Routes(){
    return(
        <Switch>
            <Route exact path={appBaseRouteKey + HomePath} render={() => <WelcomeScreen />} />
            <Route exact path={appBaseRouteKey + ReservationPath} render={() => <ReservationScreen/>} />
            <Route exact path={appBaseRouteKey + GalleryPath} render={() => <GalleryPage/>} />
            <Route exact path={appBaseRouteKey + ActivitiesPath} render={() => <ActivitiesPage />} />
            <Route exact path={appBaseRouteKey + AroundPortoPath} render={() => <AroundPortoPage/>} />
            <Route exact path={appBaseRouteKey + ContactPath} render={() => <ContactPage/>} />
            <Route exact path={appBaseRouteKey + TheWayPath} render={() => <TheWayPage/>} />
            {/* <Route exact path={appBaseRouteKey + ShopPath} render={() => <ShopPage/>} /> */}
            <Route render={() => <Redirect to={appBaseRouteKey + HomePath} />} />
        </Switch>
    );
}