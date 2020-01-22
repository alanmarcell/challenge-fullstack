import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as R from 'ramda';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {
  deliveriesDatasource,
  resetDeliveriesDatasource,
} from '../../datasource/challenge.datasource';
import DeliveriesList from './DeliveriesList';
import { Button, Typography } from '@material-ui/core';

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

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (!token) {
      history.push('/');
    }
  });

  return (
    <Paper className={classes.paper}>
      <DeliveriesList deliveries={deliveries} />
      <Button onClick={resetDeliveriesDatasource}>
        <Typography>Resetar Cadastro</Typography>
      </Button>
    </Paper>
  );
};

export default DeliveriesScene;
