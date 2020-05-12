import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './Converter.styles';
import { PageTitle } from 'components/PageTitle';
import { Calculator } from 'views/Main/Converter/Calculator';
import { IApplicationState } from 'store';
import { selectIsFetchingQuotes, selectSortedQuotes } from 'store/quotes/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { getQuotesIfNeeded } from 'store/quotes/actions';
import { FullScreenLoader } from 'components/FullScreenLoader';
import { connect } from 'react-redux';

const mapStateToProps = (state: IApplicationState) => ({
  quotes: selectSortedQuotes(state),
  isFetchingQuotes: selectIsFetchingQuotes(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getQuotesIfNeeded,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const Converter: React.FC<Props> = ({ quotes, isFetchingQuotes, getQuotesIfNeeded }) => {
  const styles = useStyles();

  useEffect(() => {
    getQuotesIfNeeded();
  }, [getQuotesIfNeeded]);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.titleWrapper}>
        <PageTitle title={'Конвертер валют'} />
      </Box>

      <Calculator quotes={quotes} />

      <FullScreenLoader isLoading={isFetchingQuotes} />
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
