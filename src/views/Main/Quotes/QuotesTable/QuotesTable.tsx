import React from 'react';
import { IQuote } from 'store/quotes/types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { QuoteRow } from 'views/Main/Quotes/QuotesTable/QuoteRow';

type Props = {
  quotes: IQuote[];
  onQuoteClick: (quote: IQuote) => void;
};

const QuotesTable: React.FC<Props> = ({ quotes, onQuoteClick }) => (
  <TableContainer component={Paper}>
    <Table size={'small'}>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Котировка</TableCell>
          <TableCell>Валютная пара</TableCell>
          <TableCell>Дата получения</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quotes.map((quote) => (
          <QuoteRow key={quote.asset} quote={quote} onClick={onQuoteClick} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default QuotesTable;
