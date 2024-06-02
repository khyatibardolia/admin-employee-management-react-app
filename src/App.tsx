import { AppRoutes } from 'routes';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    <Box height="100vh">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Box>
  );
}

export default App;
