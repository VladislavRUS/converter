import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './History.styles';
import { PageTitle } from 'components/PageTitle';
import { IApplicationState } from 'store';
import { selectDeals, selectHistoryDeals, selectIsFetchingDeals, selectPageSize } from 'store/deals/selectors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getDeals } from 'store/deals/actions';
import { FullScreenLoader } from 'components/FullScreenLoader';
import { DealsTable } from 'views/Main/History/DealsTable';

const mapStateToProps = (state: IApplicationState) => ({
  historyDeals: selectHistoryDeals(state),
  isFetchingDeals: selectIsFetchingDeals(state),
  pageSize: selectPageSize(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getDeals,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps;

const History: React.FC<Props> = ({ isFetchingDeals, historyDeals, pageSize, getDeals }) => {
  const styles = useStyles();

  useEffect(() => {
    getDeals();
  }, []);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.titleWrapper}>
        <PageTitle title={'История'} />
      </Box>

      <DealsTable deals={historyDeals} pageSize={pageSize} />

      <FullScreenLoader isLoading={isFetchingDeals} />
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
