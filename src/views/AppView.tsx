import { Box } from '@mui/material';
import Workout from './apps/Workout';

interface IAppViewProps {
  appType: any;
}

const AppView = ({ appType }: IAppViewProps) => {
  return (
    <Box sx={{ p: { xs: 0, md: 10 } }}>
      {appType === 'workout' ? <Workout /> : ''}
    </Box>
  );
};

export default AppView;
