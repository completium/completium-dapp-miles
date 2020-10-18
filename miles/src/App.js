import React from 'react';
import './App.css';
import logo from './logo.svg';
import AppStorage from './AppStorage.js';
import HeaderBar from './components/HeaderBar.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function App() {
  const [appStorage, setAppStorage] = React.useState(AppStorage);
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
      <HeaderBar appStorage={appStorage}/>
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + logo + ")",
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'center',}}>
        <Typography component="div" style={{ height: '100vh' }} />
      </Container>
    </ThemeProvider>

    </div>
  );
}

export default App;
