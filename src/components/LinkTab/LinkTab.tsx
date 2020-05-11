import React from 'react';
import { Tab } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

type LinkTabProps = {
  label: string;
  to: string;
};

const LinkTab: React.FC<LinkTabProps> = (props: LinkTabProps) => {
  return <Tab component={NavLink} {...props} />;
};

export { LinkTab };
