import { RouterProvider } from '@tanstack/react-router';
import { router } from './main';
import {
  AuthContextType,
  AuthProvider,
  useAuth,
} from 'authentication-service-react-sdk';

function InnerApp() {
  const auth = useAuth();

  return (
    <RouterProvider
      router={router}
      context={{ auth: auth as AuthContextType | undefined }}
    />
  );
}

function App() {
  return (
    <AuthProvider baseUrl="http://localhost:7001">
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
