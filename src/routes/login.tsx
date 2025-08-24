
import { Avatar, Container, Paper ,Typography,Box, TextField, Button} from '@mui/material'
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import type React from 'react';
import { login } from '../api/auth'; // Adjust the import path as necessary
import { createFileRoute, useNavigate,useSearch } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const search = useSearch({
    select: (search) => ({
      redirect: search.redirect as string | undefined, // 'redirect' parametresini okuyacak şekilde güncellendi
    }),
  });
  const [error, setError] = useState('');

  const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const username=data.get('username');
    const password=data.get('password');
    const success=await login({username,password});
    
    if(success){
      localStorage.setItem('authtoken', 'dummy_token'); // Giriş sonrası token ekle
      navigate({to:search.redirect || '/dashboard'});
    }
    else{
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');    
    }
  };
  return (
    <Container maxWidth="sx"
    sx={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  }}>
  <Paper
  elevation={10}
  sx={{
    width: '100%',
    maxWidth: 400,
    padding: 4,
    borderRadius: 3,
    backgroundColor: '#1C1C1C', // Deep dark gray for a modern, sleek feel
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)', // Darker, more pronounced shadow
  }}
>
  <Avatar
    sx={{
      backgroundColor: '#37474F', // A dark, subtle blue-gray
      width: 70,
      height: 70,
      margin: 'auto',
      marginBottom: 2,
    }}
  >
    <LockOutlineIcon sx={{ fontSize: 40, color: '#BDBDBD' }} /> 
  </Avatar>
  <Typography component="h2" variant="h4" sx={{ color: '#F5F5F5', fontWeight: 'bold' }}>
    Sign in
  </Typography>
  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
    <TextField
      name="username"
      label="Enter username"
      fullWidth
      required
      autoFocus
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#BDBDBD', // Light gray border
          },
          '&:hover fieldset': {
            borderColor: '#64B5F6', // Lighter blue on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#42A5F5', // Blue on focus
          },
        },
        '& .MuiInputBase-input': {
          color: '#F5F5F5', // Light gray input text
        },
        '& .MuiInputLabel-root': {
          color: '#BDBDBD', // Light gray label
        },
      }}
      variant="outlined"
    />
    <TextField
      name="password"
      label="Enter password"
      fullWidth
      required
      type="password"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#BDBDBD',
          },
          '&:hover fieldset': {
            borderColor: '#64B5F6',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#42A5F5',
          },
        },
        '& .MuiInputBase-input': {
          color: '#F5F5F5',
        },
        '& .MuiInputLabel-root': {
          color: '#BDBDBD',
        },
      }}
      variant="outlined"
    />
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        mt: 3,
        padding: '12px',
        borderRadius: 2,
        backgroundColor: '#42A5F5', // Vibrant blue for the button
        '&:hover': {
          backgroundColor: '#2196F3',
        },
      }}
    >
      Sign in
    </Button>
  </Box>
</Paper>
    </Container>
  );
}
