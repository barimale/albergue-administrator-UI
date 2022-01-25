import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MainPageScreen, Path as MainPagePath } from '../components/screens/MainPage';
import { appBaseRouteKey } from './Routes';

export const appSecuredRouteKey = '/app';

export default function SecuredRoutes () {
  return (
    <Switch>
      <Route
        exact
        path={appBaseRouteKey + appSecuredRouteKey + MainPagePath}
        render={() => <MainPageScreen />}
      />
      <Route render={() => <Redirect to={appBaseRouteKey + appSecuredRouteKey + MainPagePath} />} />
    </Switch>
  );
}
