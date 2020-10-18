import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../index.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const HeaderBar = (props) => {
  const minWidth = useMediaQuery('(min-width:600px)');
  const visibility = minWidth?'visible':'hidden';
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h6" style={{ position : 'absolute', fontFamily : 'Alegreya Sans SC, sans-serif' }}>
          Completium
        </Typography>
        <Typography variant="h6" style={{ flexGrow : 1, visibility : visibility }}>
          {props.appStorage.appTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar