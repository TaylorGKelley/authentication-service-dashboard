import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';
import { fieldContext, formContext } from '../contexts/FormContext';

import TextField from '../components/inputs/TextField';
const SubmitButton = lazy(() => import('../components/inputs/SubmitButton'));

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useAppForm, withForm}