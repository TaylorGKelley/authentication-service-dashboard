import { Link, useRouter } from '@tanstack/react-router';
import { useAuth } from 'authentication-service-react-sdk';

function TopBar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.navigate({ to: '/' });
  };

  return (
    <>
      <div className="flex justify-end gap-4 p-2">
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <p>
                Welcome back,{' '}
                {user?.firstName
                  ? user?.firstName + ' ' + user?.lastName
                  : user?.email}
              </p>
              <button
                onClick={handleLogout}
                className="cursor-pointer border-none bg-none p-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="[&.active]:font-bold">
                Register
              </Link>
              <Link
                to="/login"
                search={{ redirect: '/' }}
                className="[&.active]:font-bold"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}

export default TopBar;
