import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '../components/appBar';


export const Route = createRootRoute({
  component: () => (
    <>
    <Box sx={{ 
      bgcolor: '#1e2933ff', 
      minHeight: '100vh' , 
      py:5,
      color: 'white'}}>
  <Container>
    <AppBar />
    
    <Outlet />
  </Container>
    </Box>

      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      
    </>
    
  ),
})
