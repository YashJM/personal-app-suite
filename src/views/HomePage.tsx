import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from '@mui/material';
import { IUser } from '../App';

interface IHomePage {
  user: IUser;
}

const HomePage = ({ user }: IHomePage) => {
  return (
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
        <CardActionArea>
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
  );
};

export default HomePage;
