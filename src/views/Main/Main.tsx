import React, { lazy, Suspense } from 'react';
import { useStyles } from './Main.styles';
import { Box } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from 'entry/Routes';
import { NavigationBar } from 'components/NavigationBar';
import { INavigationBarLink } from 'components/NavigationBar/NavigationBar';

const Converter = lazy(() => import('views/Main/Converter'));
const Quotes = lazy(() => import('views/Main/Quotes'));
const History = lazy(() => import('views/Main/History'));

const links: INavigationBarLink[] = [
  {
    label: 'Курсы валют',
    to: Routes.QUOTES,
  },
  {
    label: 'Конвертер',
    to: Routes.CONVERTER,
  },
  {
    label: 'История',
    to: Routes.HISTORY,
  },
];

const Main = () => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <NavigationBar links={links} />

      <Box className={styles.content}>
        <Suspense fallback={null}>
          <Switch>
            <Route path={Routes.QUOTES}>
              <Quotes />
            </Route>
            <Route path={Routes.CONVERTER}>
              <Converter />
            </Route>
            <Route path={Routes.HISTORY}>
              <History />
            </Route>

            <Redirect to={Routes.QUOTES} />
          </Switch>
        </Suspense>
      </Box>
    </Box>
  );
};

export default Main;
