import React, { lazy, Suspense } from 'react';
import { useStyles } from './Main.styles';
import { Box, Button, Typography } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from 'entry/Routes';
import { NavigationBar } from 'components/NavigationBar';
import { INavigationBarLink } from 'components/NavigationBar/NavigationBar';
import { FullScreenLoader } from 'components/FullScreenLoader';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { logout } from 'store/auth/actions';

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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = DispatchProps;

const Main: React.FC<Props> = ({ logout }) => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <NavigationBar links={links}>
        <Box className={styles.btnWrapper}>
          <Button variant={'contained'} color={'secondary'} onClick={logout}>
            <Typography>Выход</Typography>
          </Button>
        </Box>
      </NavigationBar>

      <Box className={styles.content}>
        <Box className={styles.scrollableContent}>
          <Suspense fallback={<FullScreenLoader isLoading={true} />}>
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
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(Main);
