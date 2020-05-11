import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    minHeight: '90px',
  },
  bottom: {
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
  },
  alert: {
    marginTop: 'auto',
  },
});
