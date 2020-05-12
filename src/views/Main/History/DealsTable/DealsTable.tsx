import React, { useState } from 'react';
import { IDeal } from 'store/deals/types';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  TableFooter,
} from '@material-ui/core';

type Props = {
  pageSize: number;
  deals: IDeal[][];
};

const DealsTable: React.FC<Props> = ({ deals, pageSize }) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell>Актив</TableCell>
            <TableCell>Начало</TableCell>
            <TableCell>Котировка</TableCell>
            <TableCell>Конец</TableCell>
            <TableCell>Котировка</TableCell>
            <TableCell>Прибыль</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals[page].map((deal) => (
            <TableRow key={deal.finishDateTimestamp}>
              <TableCell>{deal.asset}</TableCell>
              <TableCell>{deal.startDate}</TableCell>
              <TableCell>{deal.startQuote}</TableCell>
              <TableCell>{deal.finishDate}</TableCell>
              <TableCell>{deal.finishQuote}</TableCell>
              <TableCell>{deal.profit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={deals.flat().length}
              rowsPerPageOptions={[pageSize]}
              rowsPerPage={pageSize}
              page={page}
              onChangePage={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export { DealsTable };
