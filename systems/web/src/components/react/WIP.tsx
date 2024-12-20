import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function WIP() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        justifyContent: 'center',
        marginTop: 4,
      }}
    >
      <Typography component={'header'} variant={'h1'}>
        👨‍🔧
      </Typography>
      <Typography component={'p'} variant={'h4'}>
        Working in Progress
      </Typography>
    </Box>
  );
}
