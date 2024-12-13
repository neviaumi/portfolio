import "./mui.css";
import React from 'react';
import Button from '@mui/material/Button';

export default function CustomButton(props: React.PropsWithChildren) {
    return (<Button variant="contained">{props.children}</Button>)
}