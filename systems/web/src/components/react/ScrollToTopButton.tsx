import KeyboardArrowDoubleUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Fab from '@mui/material/Fab';

export default function ScrollToTopButton() {
  return (
    <Fab
      aria-label="Scroll to top"
      color="primary"
      onClick={() => {
        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        });
      }}
    >
      <KeyboardArrowDoubleUpIcon />
    </Fab>
  );
}
