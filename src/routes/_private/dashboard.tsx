
import { createFileRoute} from '@tanstack/react-router';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { VoiceRecordButton } from '@/components/voiceRecordButton';


export const Route = createFileRoute('/_private/dashboard')({
  component: RouteComponent,
});


function RouteComponent() {
  const [listening, setListening] = useState(false);

  const handleMicClick = () => {
    if ('mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setListening(true);
          // Ses işleme kodunu burada ekleyebilirsiniz
        })
        .catch(() => {
          setListening(false);
          alert('Mikrofon erişimi reddedildi!');
        });
    }
  };
  return (
    <Box sx={{ p: 4}}>
      <Typography variant="h5">Dashboard</Typography>
      
    
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh', // Ortalamak için yeterli yükseklik
        }}
      >
      <VoiceRecordButton listening={listening} onClick={handleMicClick} />
    </Box>    
    </Box>
  );
}