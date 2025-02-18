import KeyboardArrowDoubleUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export default function ScrollToTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  return (
    <Fade in={trigger}>
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
    </Fade>
  );
}
