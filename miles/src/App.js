import React from 'react';
import './App.css';
import ticket from './img/takeoff-ticket.svg';
import AppStorage from './AppStorage.js';
import HeaderBar from './components/HeaderBar.js';
import Dashboard from './components/Dashboard.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

function App() {
  const [connected, setConnected]   = React.useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBar appStorage={AppStorage}/>
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + ticket + ")",
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'right 50% top 5%',}}>
        <Dashboard connected={connected} setConnected={setConnected}/>
      </Container>
    </ThemeProvider>

    </div>
  );
}

export default App;
