import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from './FullScreenLoader.styles';

type Props = {
  isLoading: boolean;
};

const FullScreenLoader: React.FC<Props> = ({ isLoading }) => {
  const styles = useStyles();

  return (
    <Backdrop open={isLoading} className={styles.backdrop}>
      <CircularProgress color={'inherit'} />
    </Backdrop>
  );
};

export { FullScreenLoader };
