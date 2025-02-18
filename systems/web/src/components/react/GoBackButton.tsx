import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

export default function GoBackButton() {
  const [showBackButton, setShowBackButton] = useState(false);
  useEffect(() => {
    // Check if the previous page (referrer) is from the portfolio
    const referrer = document.referrer; // Referring URL
    if (referrer) {
      setShowBackButton(
        new URL(referrer).hostname === window.location.hostname,
      ); // Show BackButton
    }
  }, []); // Empty dependency -> Runs only on component mount

  if (!showBackButton) return null;
  return (
    <IconButton
      aria-label="go back"
      color="inherit"
      onClick={() => {
        history.back();
      }}
      size={'small'}
    >
      <ArrowBackIcon fontSize={'large'} />
    </IconButton>
  );
}
