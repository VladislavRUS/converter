import { FieldMetaState } from 'react-final-form';
import { Mutator } from 'final-form';

export const showFieldError = <T>(meta: FieldMetaState<T>) => !!meta.submitFailed && !!(meta.error || meta.submitError);

export const getFieldError = <T>(meta: FieldMetaState<T>) => (meta.submitFailed ? meta.error || meta.submitError : '');

export const setValue: Mutator = ([field, value], state, utils) => {
  utils.changeValue(state, field, () => value);
};
