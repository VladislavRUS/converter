import React from 'react';
import { IQuote } from 'store/quotes/types';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import { useStyles } from './QuoteRow.styles';
import { Box, TableCell, TableRow } from '@material-ui/core';

type Props = {
  quote: IQuote;
  onClick: (quote: IQuote) => void;
};

const QuoteRow: React.FC<Props> = ({ quote, onClick }) => {
  const styles = useStyles();

  const onRowClick = () => onClick(quote);

  return (
    <TableRow hover={true} onClick={onRowClick} className={styles.row}>
      <TableCell padding={'checkbox'}>
        <Box className={styles.starIconWrapper}>
          {quote.isFavorite ? <Star className={styles.starIcon} /> : <StarBorder className={styles.starIcon} />}
        </Box>
      </TableCell>
      <TableCell>{quote.asset}</TableCell>
      <TableCell>{quote.quote}</TableCell>
      <TableCell>{quote.startDate}</TableCell>
    </TableRow>
  );
};

export default React.memo(QuoteRow);
