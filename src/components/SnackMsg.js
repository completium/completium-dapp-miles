import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';
import { ThemeProvider } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackMsg = (props) => {
    return (
      <Snackbar open={props.open} >
        <Alert severity="info" style={{ backgroundColor: props.theme.palette.secondary.main }}>
          Waiting for operation confirmation ...
        </Alert>
      </Snackbar>)
}

export default SnackMsg