import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fab from '@mui/material/Fab';

export default function GoBackButton() {
  return (
    <Fab
      aria-label="go back"
      color="default"
      onClick={() => {
        history.back();
      }}
    >
      <ArrowBackIcon />
    </Fab>
  );
}
