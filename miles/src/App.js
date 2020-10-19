import React from 'react';
import './App.css';
import ticket from './img/takeoff-ticket.svg';
import AppStorage from './AppStorage.js';
import HeaderBar from './components/HeaderBar.js';
import Dashboard from './components/Dashboard.js';
import Product from './components/Product.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from './components/Footer';
import ViewMiles from './components/ViewMiles';

function getProductStates (connected, nbActiveMiles) {
  var states = [];
  AppStorage.products.forEach (product => {
    states[product.pid] = (connected && nbActiveMiles >= product.nbmiles)
  });
  return states;
}

function getNextExpirationDate () {
  var next = new Date(8640000000000000);
  AppStorage.milesDemo.forEach(mile => {
    var expiration = new Date(mile.expiration);
    if (expiration >= Date.now() && expiration <= next) {
      next = expiration;
    }
  });
  return next;
}

function App() {
  const [connected, setConnected]   = React.useState(false);
  const [nbMiles, setNbMiles]       = React.useState(AppStorage.nbActiveMiles);
  const [viewMiles, setViewMiles]   = React.useState(false);
  const [productStates, setProductStates] = React.useState(getProductStates(connected,AppStorage.nbActiveMiles));
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const nextExpiration = getNextExpirationDate();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const handleConnected = () => {
    setProductStates(getProductStates(true,AppStorage.nbActiveMiles));
    setConnected (true);
  }

  const openViewMiles = () => {
    setViewMiles(true);
  };

  const closeViewMiles = () => {
    setViewMiles(false);
  };

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HeaderBar appStorage={AppStorage}/>
      <Container maxWidth="md" style={{
          backgroundImage : "url(" + ticket + ")",
          backgroundRepeat  : 'no-repeat',
          backgroundPosition: 'right 50% top 5%',}}>
        <Dashboard
          connected={connected}
          nbMiles={nbMiles}
          nextExpiration={nextExpiration}
          handleConnected={handleConnected}
          openViewMiles={openViewMiles}/>
        <Grid container direction="row" spacing={2} style={{ marginBottom: 100 }}> {
            AppStorage.products.map(product =>
              <Grid item xs={4}>
                <Product
                  image={product.image}
                  title={product.title}
                  nbmiles={product.nbmiles}
                  state={productStates[product.pid]}
                  connected={connected}>
                </Product>
              </Grid>
            )}
        </Grid>
      </Container>
      <Footer></Footer>
      <ViewMiles open={viewMiles} onclose={closeViewMiles} />
    </ThemeProvider>

    </div>
  );
}

export default App;
