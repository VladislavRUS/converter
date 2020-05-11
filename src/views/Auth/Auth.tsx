import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './Auth.styles';
import { LoginForm } from 'views/Auth/LoginForm';

const Auth = () => {
  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.formWrapper}>
        <Box className={styles.formHeader}>
          <Typography className={styles.headerText}>Вход в личный кабинет</Typography>
        </Box>
        <Box className={styles.formBody}>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
