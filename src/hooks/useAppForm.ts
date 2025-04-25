import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';
import { fieldContext, formContext } from '../contexts/FormContext';

import TextField from '../components/inputs/TextField';
import PasswordField from '../components/inputs/PasswordField';
import EmailField from '../components/inputs/EmailField';
const SubmitButton = lazy(() => import('../components/inputs/SubmitButton'));

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    EmailField,
    PasswordField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
