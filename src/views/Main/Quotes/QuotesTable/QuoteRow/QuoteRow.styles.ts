import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  row: {
    minHeight: '50px',
    cursor: 'pointer',
  },
  starIconWrapper: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIcon: {
    width: '100%',
    height: '100%',
  },
});
