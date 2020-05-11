import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
  },
});
