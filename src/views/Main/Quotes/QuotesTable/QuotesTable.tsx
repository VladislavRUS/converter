import React from 'react';
import { IQuote } from 'store/quotes/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
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
