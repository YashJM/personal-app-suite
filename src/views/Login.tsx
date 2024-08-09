import { signInWithPopup, User } from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';
import { Box, Button, Typography } from '@mui/material';

interface IlogIn {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const Login = ({ setUser }: IlogIn) => {
  const handleLogIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;
      setUser(user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      paddingTop={10}>
      <Typography gutterBottom variant='h2' textAlign={'center'}>
        Login if you are authorized
      </Typography>
      <Button variant='contained' onClick={handleLogIn}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
