import isEmail from 'validator/lib/isEmail';

export const required = (value?: string) => (value !== undefined ? undefined : 'Обязательное поле');

export const email = (value: string) => (isEmail(value) ? undefined : 'Неправильный email');

const PASSWORD_REGEXP = /^[a-z0-9_]+$/i;

export const password = (value: string) => {
  if (value.length < 7) {
    return 'Пароль должен быть больше 7 символов';
  }

  if (!PASSWORD_REGEXP.test(value)) {
    return 'Только буквы латинского алфавита, цифры и _';
  }

  return undefined;
};

export const min = (minValue: number) => (value: string) => {
  if (parseInt(value) < minValue) {
    return `Число должно быть больше ${minValue - 1}`;
  }

  return undefined;
};

export const composeValidators = (...validators: Function[]) => (value: string) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
