import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { useAuth, type User } from 'authentication-service-react-sdk';
import axios from 'axios';
import { useAppForm } from '../../hooks/useAppForm';

const registerSchema = z
  .object({
    firstName: z.string().nonempty('First name is required'),
    lastName: z.string().nonempty('Last name is required'),
    email: z.string().email('Invalid Email'),
    password: z.string().min(8, 'Password must be over 8 characters long'),
    passwordConfirm: z
      .string()
      .min(8, 'Password must be over 8 characters long'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

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
          const response = await axios.post<{
            accessToken?: string;
            user?: User;
            message?: string;
          }>(
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
              form: response.data.message!,
            };
          } else if (response.status === 403) {
            return {
              fields: {
                email: response.data.message!,
              },
            };
          }

          const { accessToken, user } = response.data;
          auth.login({
            accessToken: accessToken!,
            user: user!,
          });

          return null;
        } catch (error) {
          console.error(error);
        }
      },
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
          <form.AppField
            name="firstName"
            children={(field) => <field.TextField label="First Name" />}
          />
          <form.AppField
            name="lastName"
            children={(field) => <field.TextField label="Last Name" />}
          />
        </div>
        <form.AppField
          name="email"
          children={(field) => <field.EmailField label="Email" />}
        />
        <form.AppField
          name="password"
          children={(field) => <field.PasswordField label="Password" />}
        />
        <form.AppField
          name="passwordConfirm"
          validators={{
            onChangeListenTo: ['password'],
          }}
          children={(field) => <field.PasswordField label="Confirm Password" />}
        />
        <form.SubmitButton label="submit" />
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
