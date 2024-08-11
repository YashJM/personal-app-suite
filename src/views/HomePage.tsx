import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { IUser } from '../App';
import { useState } from 'react';
import AppView from './AppView';

interface IHomePage {
  user: IUser;
}

const HomePage = ({ user }: IHomePage) => {
  const [activeApp, setActiveApp] = useState<any>(null);

  return (
    <>
      {activeApp ? (
        <AppView appType={activeApp} />
      ) : (
        <Box
          paddingTop={10}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}>
          <Typography gutterBottom variant='h1' textAlign={'center'}>
            Welcome Back Boss!
          </Typography>
          <Card sx={{ width: 180 }}>
            <CardActionArea onClick={() => setActiveApp('workout')}>
              <CardMedia
                component='img'
                height='140'
                image='/assets/workout.jpeg'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Workout
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      )}
    </>
  );
};

export default HomePage;
