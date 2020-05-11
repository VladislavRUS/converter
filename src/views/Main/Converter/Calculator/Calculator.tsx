import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button } from '@material-ui/core';
import { IQuote } from 'store/quotes/types';
import { useStyles } from './Calculator.styles';
import { Form, Field } from 'react-final-form';
import { Select, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { composeValidators, min, required } from 'utils/validators';
import { getFieldError, setValue, showFieldError } from 'utils/form';
import { FormApi } from 'final-form';

interface ICalculatorFromValues {
  amount?: string;
  fromCurrency?: string;
  toCurrency?: string;
}

type Props = {
  quotes: IQuote[];
};

const Calculator: React.FC<Props> = ({ quotes }) => {
  const styles = useStyles();

  const [result, setResult] = useState<{
    value: null | string;
    error: null | string;
  } | null>(null);

  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const allCurrencies: string[] = [];

    quotes.forEach((quote) => {
      const [firstCurrency, secondCurrency] = quote.asset.split('/');
      allCurrencies.push(firstCurrency);
      allCurrencies.push(secondCurrency);
    });

    setCurrencies(Array.from(new Set(allCurrencies)));
  }, [quotes]);

  const onCurrencyChange = (
    field: string,
    value: any,
    values: ICalculatorFromValues,
    form: FormApi<ICalculatorFromValues>
  ) => {
    form.mutators.setValue(field, value);

    const { fromCurrency, toCurrency } = values;

    // Меняем местами значения, если выбрали то же самое в другом селекте
    if (field === 'fromCurrency' && value === toCurrency) {
      form.mutators.setValue('toCurrency', fromCurrency);
    }

    if (field === 'toCurrency' && value === fromCurrency) {
      form.mutators.setValue('fromCurrency', toCurrency);
    }
  };

  // Поиск прямых или обратных валютных пар для двух валют
  const findQuotesByCurrencies = (quotes: IQuote[], fromCurrency: string, toCurrency: string) => {
    const directAsset = `${fromCurrency}/${toCurrency}`;
    const reversedAsset = `${toCurrency}/${fromCurrency}`;

    const directQuote = quotes.find((quote) => quote.asset === directAsset);
    const reversedQuote = quotes.find((quote) => quote.asset === reversedAsset);

    return { directQuote, reversedQuote };
  };

  const onSubmit = (values: ICalculatorFromValues) => {
    const { amount, fromCurrency, toCurrency } = values;

    if (!amount || !fromCurrency || !toCurrency) {
      return;
    }

    const { directQuote, reversedQuote } = findQuotesByCurrencies(quotes, fromCurrency, toCurrency);

    if (directQuote) {
      setResult({
        value: (parseFloat(amount) * parseFloat(directQuote.quote)).toFixed(2),
        error: null,
      });
    } else if (reversedQuote) {
      setResult({
        value: (parseFloat(amount) / parseFloat(reversedQuote.quote)).toFixed(2),
        error: null,
      });
    } else {
      setResult({ value: null, error: 'Нет подходящей валютной пары' });
    }
  };

  if (currencies.length > 0 && currencies.length < 2) {
    return <Alert>Недостаточно данных для конвертации</Alert>;
  }

  return (
    <Paper className={styles.wrapper}>
      <Box className={styles.titleWrapper}>
        <Typography>Сумма</Typography>
      </Box>

      <Form
        onSubmit={onSubmit}
        initialValues={{
          amount: '100',
          fromCurrency: currencies[0],
          toCurrency: currencies[1],
        }}
        mutators={{ setValue }}
        render={({ form, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Box className={styles.formFields}>
              <Field
                name={'amount'}
                type={'number'}
                validate={composeValidators(required, min(1))}
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    variant={'outlined'}
                    error={showFieldError(meta)}
                    helperText={getFieldError(meta)}
                    className={styles.input}
                  />
                )}
              />

              <Box className={styles.divider} />

              <Field
                name={'fromCurrency'}
                render={({ input }) => (
                  <Select
                    {...input}
                    variant={'outlined'}
                    className={styles.select}
                    onChange={(event) => onCurrencyChange('fromCurrency', event.target.value, values, form)}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency} onClick={form.mutators.currencyMutator}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <Box className={styles.divider} />

              <Field
                name={'toCurrency'}
                render={({ input }) => (
                  <Select
                    {...input}
                    variant={'outlined'}
                    className={styles.select}
                    onChange={(event) => onCurrencyChange('toCurrency', event.target.value, values, form)}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              <Box className={styles.divider} />

              <Box className={styles.buttonWrapper}>
                <Button type={'submit'} variant={'contained'} color={'primary'}>
                  <Typography>Рассчитать</Typography>
                </Button>
              </Box>
            </Box>

            {result && (
              <Box className={styles.result}>
                {result.error && <Alert severity={'error'}>{result.error}</Alert>}

                {result.value && (
                  <React.Fragment>
                    <Typography>Итого</Typography>
                    <Typography variant={'h2'}>{result.value}</Typography>
                  </React.Fragment>
                )}
              </Box>
            )}
          </form>
        )}
      />
    </Paper>
  );
};

export { Calculator };
