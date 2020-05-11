import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { getQuotes, toggleFavoriteQuote } from 'store/quotes/actions';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import QuotesTable from 'views/Main/Quotes/QuotesTable';
import { IApplicationState } from 'store';
import {
  selectIsFetchingQuotes,
  selectSortedQuotes,
} from 'store/quotes/selectors';
import { FullScreenLoader } from 'components/FullScreenLoader';
import { useStyles } from './Quotes.styles';

const mapStateToProps = (state: IApplicationState) => ({
  quotes: selectSortedQuotes(state),
  isFetchingQuotes: selectIsFetchingQuotes(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getQuotes,
      toggleStarQuote: toggleFavoriteQuote,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const Quotes: React.FC<Props> = ({
  quotes,
  isFetchingQuotes,
  getQuotes,
  toggleStarQuote,
}) => {
  const styles = useStyles();

  useEffect(() => {
    if (quotes.length === 0) {
      getQuotes();
    }
  }, [getQuotes, quotes.length]);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.tableWrapper}>
        <QuotesTable quotes={quotes} onQuoteClick={toggleStarQuote} />
      </Box>
      <FullScreenLoader isLoading={isFetchingQuotes} />
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
