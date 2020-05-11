import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from 'entry/Routes';

const Auth = lazy(() => import('views/Auth'));
const Main = lazy(() => import('views/Main'));

const App = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route path={Routes.AUTH}>
        <Auth />
      </Route>
      <Route path={Routes.MAIN}>
        <Main />
      </Route>

      <Redirect to={Routes.AUTH} />
    </Switch>
  </Suspense>
);

export { App };
