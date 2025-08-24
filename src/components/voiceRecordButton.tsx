import { Button } from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';

export function VoiceRecordButton({listening,onClick}){
    return(
    <Button
        variant={listening ? 'contained' : 'outlined'}
        sx={{ 
            
            width:listening ? 100 : 80 ,
            height:listening ? 100 :  80, 
            minWidth:0,
            borderRadius: '50%',
            padding: 0,
        transition: 'transform 0.3s ease-in-out',
        transform: listening ? 'scale(1.2)' : 'scale(1)',}}
        color={listening ? 'success' : 'primary'}
        onClick={onClick}
    >
        

        <MicNoneIcon 
        sx={{
            fontSize: 50,
            color: listening ? 'white' : 'primary.main',
        }}/>
        
    </Button>
    );
}