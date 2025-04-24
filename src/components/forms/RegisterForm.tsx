import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import {useAuth, type User} from 'authentication-service-react-sdk';
import axios from 'axios';
import { useAppForm } from '../../hooks/useAppForm';

const registerSchema = z
.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid Email'),
  password: z
    .string()
    .min(8, 'Password must be over 8 characters long'),
  passwordConfirm: z
    .string()
    .min(8, 'Password must be over 8 characters long'),
})
.refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
})

const RegisterForm = () => {
  const router = useRouter();
  const auth = useAuth();

  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validators: {
      onChange: registerSchema,
      onSubmitAsync: async ({ value }) => {
        try {         
          const response = await axios.post<{accessToken?: string, user?: User, message?: string}>(
            'http://localhost:7001/api/v1/register',
            {
              ...value,
            },
            {
              withCredentials: true,
            },
          );
          
          if (response.status === 400) {
            return {
              form: response.data.message!
            }
          } else if (response.status === 403) {
            return {
              fields: {
                email: response.data.message!
              }
            }
          }
          
          const { accessToken, user } = response.data
          auth.login({
            accessToken: accessToken!,
            user: user!,
          });
          
          return null;
        }
        catch (error) {
          console.error(error);
        }
      }
    },
    onSubmit: () => {
        router.navigate({ to: '/' });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex max-w-sm flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <form.Field
            name="firstName"
            children={(field) => (
              <div className="flex flex-col">
                <label htmlFor={field.name} className="text-sm">
                  First Name:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="rounded-xl border-1 border-slate-800 bg-white px-4 py-1 shadow-md"
                />
              </div>
            )}
          />
          <form.Field
            name="lastName"
            children={(field) => (
              <div className="flex flex-col">
                <label htmlFor={field.name} className="text-sm">
                  Last Name:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="rounded-xl border-1 border-slate-800 bg-white px-4 py-1 shadow-md"
                />
              </div>
            )}
          />
        </div>
        <form.Field
          name="email"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name} className="text-sm">
                Email:
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.setValue(e.target.value)}
                className="rounded-xl border-1 border-slate-800 bg-white px-4 py-1 shadow-md"
              />
            </div>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name} className="text-sm">
                Password:
              </label>
              <input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.setValue(e.target.value)}
                className="rounded-xl border-1 border-slate-800 bg-white px-4 py-1 shadow-md"
              />
            </div>
          )}
        />
        <form.Field
          name="passwordConfirm"
          validators={{
            onChangeListenTo: ['password']
          }}
          children={(field) => (
            <div className="flex flex-col">
              <label htmlFor={field.name} className="text-sm">
                Password Confirm:
              </label>
              <input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.setValue(e.target.value)}
                className="rounded-xl border-1 border-slate-800 bg-white px-4 py-1 shadow-md"
              />
            </div>
          )}
        />

        <form.SubmitButton>Submit</form.SubmitButton>
        <a
          href="http://localhost:7001/api/v1/auth/google"
          className="w-full cursor-pointer rounded-xl bg-slate-800 px-6 py-1 text-center text-white no-underline shadow-md"
        >
          Register with Google
        </a>
      </form>
    </div>
  );
};

export default RegisterForm;
