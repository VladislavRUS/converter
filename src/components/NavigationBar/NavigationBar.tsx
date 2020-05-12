import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Toolbar } from '@material-ui/core';
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

const NavigationBar: React.FC<Props> = ({ links, children }) => {
  const history = useHistory();

  const styles = useStyles();

  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(
      links.findIndex((link) => {
        return history.location.pathname === link.to;
      })
    );
  }, [links, history.location.pathname]);

  const onChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <AppBar className={styles.header}>
      <Toolbar>
        <Tabs variant={'fullWidth'} value={tab} onChange={onChange}>
          {links.map((link) => (
            <LinkTab key={link.to} label={link.label} to={link.to} />
          ))}
        </Tabs>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
