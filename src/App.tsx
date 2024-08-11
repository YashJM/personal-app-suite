import { useState } from 'react';
import { User } from 'firebase/auth';
import HomePage from './views/HomePage';
import Login from './views/auth/Login';
import UnauthorisedAccessScreen from './views/auth/UnauthorisedAccessScreen';

export interface IUser extends User {
  displayName: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<any>(null);
  const isAuthorizedUser = (user: IUser | null): boolean => {
    return user?.email === import.meta.env.VITE_APP_EMAIL;
  };

  return (
    <div>
      {/* {user ? (
        isAuthorizedUser(user) ? (
          <HomePage user={user} />
        ) : (
          <UnauthorisedAccessScreen />
        )
      ) : (
        <Login setUser={setUser} />
      )} */}
      <HomePage user={user} />
    </div>
  );
}

export default App;
