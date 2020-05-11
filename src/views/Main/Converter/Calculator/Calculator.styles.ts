import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '20px',
  },
  titleWrapper: {
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formFields: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '50px',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginBottom: '10px',
    },
  },
  divider: {
    width: '32px',
    height: '32px',
  },
  input: {
    width: '120px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      flexGrow: 1,
    },
  },
  select: {
    width: '144px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      flexGrow: 1,
    },
  },
  buttonWrapper: {
    marginTop: '10px',
  },
  result: {},
}));
