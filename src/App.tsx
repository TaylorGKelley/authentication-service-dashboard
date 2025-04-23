import { RouterProvider } from '@tanstack/react-router';
import { router } from './main';
import {
  AuthContextType,
  AuthProvider,
  useAuthContext,
} from 'authentication-service-react-sdk';

function InnerApp() {
  const auth = useAuthContext();

  return (
    <RouterProvider
      router={router}
      context={{ auth: auth as AuthContextType | undefined }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
