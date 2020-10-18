import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Dashboard = (props) => {
  console.log(props.connected);
  if (props.connected) {
    return (
      <Container style={{ height: '300px'}}>
        <Container style={{ height: '120px' }}></Container>
        <Paper style={{ opacity: 0.8, paddingLeft: 18, paddingRight: 18 }}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography color="textSecondary">
                  Active Miles : 5
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color="textSecondary" >
                  Time before next mile expiration : 23h 45m 30s
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button>View Miles</Button>
              </Grid>
            </Grid>
        </Paper>
      </Container>
    )
  } else {
    return (
      <Grid container direction="column" style={{ height: '300px'}}>
        <Grid item xs={12}>
          <Button variant="contained" size="medium" color="secondary" style={{ marginTop: '125px' }}
            disableElevation
            onClick={() => {
              props.setConnected(true);
            }}>
            Connect Wallet
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default Dashboard