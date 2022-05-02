import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 6 }}>
      <CircularProgress />
    </Box>
  );
}
