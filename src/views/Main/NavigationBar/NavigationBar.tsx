import React, { useState } from 'react';
import { AppBar, Tabs } from '@material-ui/core';
import { LinkTab } from 'components/LinkTab';
import { Routes } from 'entry/Routes';
import { useStyles } from './NavigationBar.styles';

const NavigationBar = () => {
  const styles = useStyles();

  const [tab, setTab] = useState(0);

  const onChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <AppBar className={styles.header}>
      <Tabs variant={'fullWidth'} value={tab} onChange={onChange}>
        <LinkTab label={'Курсы валют'} to={Routes.QUOTES} />
        <LinkTab label={'Конвертор'} to={Routes.CONVERTER} />
        <LinkTab label={'История'} to={Routes.HISTORY} />
      </Tabs>
    </AppBar>
  );
};

export default NavigationBar;
