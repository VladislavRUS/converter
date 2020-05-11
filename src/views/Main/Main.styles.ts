import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  header: {
    position: 'static',
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: '20px 50px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px',
    },
  },
}));
