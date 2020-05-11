import { FieldMetaState } from 'react-final-form';

export const showFieldError = <T>(meta: FieldMetaState<T>) =>
  !!meta.submitFailed && !!(meta.error || meta.submitError);

export const getFieldError = <T>(meta: FieldMetaState<T>) =>
  meta.submitFailed ? meta.error || meta.submitError : '';
