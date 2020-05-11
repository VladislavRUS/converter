import React from 'react';
import { Form, Field } from 'react-final-form';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import { useStyles } from './LoginForm.styles';
import { bindActionCreators, Dispatch } from 'redux';
import { login } from 'store/auth/actions';
import { connect } from 'react-redux';
import { LoginFormData } from 'store/auth/types';
import { getFieldError, showFieldError } from 'utils/form';
import { composeValidators, email, password, required } from 'utils/validators';
import { IApplicationState } from 'store';
import { selectIsAuthenticating, selectLoginError } from 'store/auth/selectors';
import { Alert } from '@material-ui/lab';
import { FullScreenLoader } from 'components/FullScreenLoader';

const mapStateToProps = (state: IApplicationState) => ({
  error: selectLoginError(state),
  isAuthenticating: selectIsAuthenticating(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const LoginForm: React.FC<Props> = ({ login, error, isAuthenticating }) => {
  const styles = useStyles();

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        login: process.env.REACT_APP_LOGIN,
        password: process.env.REACT_APP_PASSWORD,
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Field
            name={'login'}
            type={'email'}
            validate={composeValidators(required, email)}
            render={({ input, meta }) => (
              <TextField
                {...input}
                label={'Логин'}
                error={showFieldError(meta)}
                helperText={getFieldError(meta)}
                className={styles.input}
              />
            )}
          />

          <Field
            name={'password'}
            type={'password'}
            validate={composeValidators(required, password)}
            render={({ input, meta }) => (
              <TextField
                {...input}
                label={'Пароль'}
                error={showFieldError(meta)}
                helperText={getFieldError(meta)}
                className={styles.input}
              />
            )}
          />

          <Box className={styles.bottom}>
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              fullWidth={true}
            >
              <Typography>Вход</Typography>
            </Button>

            {error && (
              <Alert severity="error" className={styles.alert}>
                {error}
              </Alert>
            )}
          </Box>

          <FullScreenLoader isLoading={isAuthenticating} />
        </form>
      )}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
