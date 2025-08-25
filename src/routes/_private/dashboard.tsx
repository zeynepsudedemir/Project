
import { createFileRoute} from '@tanstack/react-router';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { VoiceRecordButton } from '@/components/voiceRecordButton';


export const Route = createFileRoute('/_private/dashboard')({
  component: RouteComponent,
});


function RouteComponent() {
  const [listening, setListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleMicClick = () => {
    if (listening) {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setListening(false);
    } else {
      if ('mediaDevices' in navigator) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            const recorder = new MediaRecorder(stream);
            setAudioChunks([]); // Yeni kayıtta chunks sıfırla
            recorder.ondataavailable = (event) => {
              setAudioChunks((prev) => [...prev, event.data]);
            };
            recorder.onstop = async () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
              const formData = new FormData();
              formData.append('file', audioBlob, 'record.wav');
              try {
                const resp = await fetch('{backend_url}/upload', {
                  method: 'POST',
                  body: formData,
                });
                if (resp.ok) {
                  alert('Uploaded!');
                } else {
                  alert('Upload failed!');
                }
              } catch (error) {
                alert('Upload error!' + error);
              }
              setAudioChunks([]);
              stream.getTracks().forEach(track => track.stop());
            };
            setMediaRecorder(recorder);
            recorder.start();
            setListening(true);
          })
          .catch(() => {
            setListening(false);
            alert('Mikrofon erişimi reddedildi!');
          });
      }
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