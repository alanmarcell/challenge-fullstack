import React from 'react';
import * as R from 'ramda';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

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

const DeliveriesList = props => {
  const classes = useStyles();
  const { deliveries } = props;
  const totalWeight = R.reduce(
    (acc, { weight }) => acc + weight,
    0,
    deliveries,
  );

  const totalClients = deliveries.length || 0;
  const meanTicket = totalClients ? totalWeight / totalClients : 0;
  const headerString = `Total de clientes: ${totalClients}. Peso total: ${totalWeight} kg. Ticket médio: ${meanTicket}`;

  return (
    <Paper className={classes.paper}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {headerString}
        </Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Rua</TableCell>
              <TableCell align="left">Cidade</TableCell>
              <TableCell align="left">País</TableCell>
              <TableCell align="left">Peso</TableCell>
              <TableCell align="left">Lat</TableCell>
              <TableCell align="left">Lng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map(row => (
              // eslint-disable-next-line no-underscore-dangle
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.clientName}
                </TableCell>
                <TableCell align="left">{row.address.street}</TableCell>
                <TableCell align="left">{row.address.city}</TableCell>
                <TableCell align="left">{row.address.country}</TableCell>
                <TableCell align="left">{row.weight}</TableCell>
                <TableCell align="left">
                  {row.address.geoLocalization.latitude}
                </TableCell>
                <TableCell align="left">
                  {row.address.geoLocalization.longitude}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DeliveriesList.propTypes = {
  deliveries: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      clientName: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      address: PropTypes.shape({
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        geoLocalization: PropTypes.shape({
          latitude: PropTypes.string.isRequired,
          longitude: PropTypes.string.isRequired,
        }),
      }),
    }),
  ).isRequired,
};

export default DeliveriesList;
