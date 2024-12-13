import './mui.css';

import Button from '@mui/material/Button';
import React from 'react';

export default function CustomButton(props: React.PropsWithChildren) {
  return <Button variant="contained">{props.children}</Button>;
}
