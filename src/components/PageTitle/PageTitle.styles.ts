import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '60px',
    padding: '0 50px',
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    lineHeight: '60px',
    color: '#fff',
    fontSize: 24,
  },
}));
