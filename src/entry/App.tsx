import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from 'entry/Routes';
import { FullScreenLoader } from 'components/FullScreenLoader';

const Auth = lazy(() => import('views/Auth'));
const Main = lazy(() => import('views/Main'));

const App = () => (
  <Suspense fallback={<FullScreenLoader isLoading={true} />}>
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
