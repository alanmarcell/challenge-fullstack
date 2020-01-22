import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as R from 'ramda';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  deliveriesDatasource,
  resetDeliveriesDatasource,
} from '../../datasource/challenge.datasource';
import DeliveriesList from './DeliveriesList';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 640,
  },
  title: {
    flex: '1 1 100%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const DeliveriesScene = () => {
  const classes = useStyles();

  const history = useHistory();
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    if (R.isEmpty(deliveries)) {
      deliveriesDatasource().then(res => {
        setDeliveries(res.data.deliveries);
      });
    }
  });

  const [token, setToken] = useState(localStorage.getItem('user-token'));

  const onLogout = () => {
    localStorage.setItem('user-token', '');
    setToken('');
  };

  const onResetDeliveries = async () => {
    await resetDeliveriesDatasource();
    setDeliveries([]);
  };

  useEffect(() => {
    if (!token) {
      history.push('/auth');
    }
  });

  return (
    <Paper className={classes.paper}>
      <DeliveriesList deliveries={deliveries} />
      <Button onClick={onResetDeliveries} variant="outlined">
        <Typography>Resetar Cadastro</Typography>
      </Button>
      <Button onClick={onLogout} variant="outlined">
        <Typography>Logout</Typography>
      </Button>
    </Paper>
  );
};

export default DeliveriesScene;
