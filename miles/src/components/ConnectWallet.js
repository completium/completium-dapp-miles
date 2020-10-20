import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from '@material-ui/core';
import Miles from './Miles.js';
import { useReady, useWallet } from '../dapp';

const ConnectWallet = (props) => {

  const ready = useReady();
  const wallet = useWallet();

  if (ready) {
    return <Miles
      nbMiles={props.nbMiles}
      nextExpiration={props.nextExpiration}
      handleConnect={props.handleConnect}
      openViewMiles={props.openViewMiles} />
  } else {
    return (
      <Grid container direction="column" style={{ height: '300px'}}>
        <Grid item xs={12}>
          { wallet? (
            <Button variant="contained" size="medium" color="secondary" style={{ marginTop: '125px' }}
              disableElevation
              onClick={props.handleConnect}>
              connect to wallet
            </Button>
          ):(
            <Link href="https://thanoswallet.com/" rel="noopener" underline="none">
              <Button variant="contained" size="medium" style={{
                marginTop: '125px',
                backgroundColor: '#ed8936',
                color: 'white',
                fontWeight: 'bold'  }}
                disableElevation>
                Install Thanos
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    )
  }
}

export default ConnectWallet