import React, { useState } from 'react';
import { AppBar, Tabs } from '@material-ui/core';
import { LinkTab } from 'components/LinkTab';
import { useStyles } from './NavigationBar.styles';
import { useHistory } from 'react-router-dom';

export interface INavigationBarLink {
  label: string;
  to: string;
}

type Props = {
  links: INavigationBarLink[];
};

const NavigationBar: React.FC<Props> = ({ links }) => {
  const history = useHistory();

  const styles = useStyles();

  const [tab, setTab] = useState(
    links.findIndex((link) => {
      return history.location.pathname === link.to;
    })
  );

  const onChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <AppBar className={styles.header}>
      <Tabs variant={'fullWidth'} value={tab} onChange={onChange}>
        {links.map((link) => (
          <LinkTab key={link.to} label={link.label} to={link.to} />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default NavigationBar;
