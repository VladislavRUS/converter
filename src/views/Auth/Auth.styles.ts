import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  formWrapper: {
    flexGrow: 1,
    maxWidth: '480px',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px -2px rgba(0, 0, 0, 0.3)',
    margin: '0 10px',
  },
  formHeader: {
    height: '60px',
    backgroundColor: theme.palette.primary.main,
  },
  headerText: {
    lineHeight: '60px',
    textAlign: 'center',
    color: '#fff',
  },
  formBody: {
    padding: '67px 20px 20px',
  },
}));
