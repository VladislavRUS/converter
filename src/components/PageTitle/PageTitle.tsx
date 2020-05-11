import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './PageTitle.styles';

type Props = {
  title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <Typography className={styles.title} component={'h1'}>
        {title}
      </Typography>
    </Box>
  );
};

export { PageTitle };
