import React, { useState } from 'react';
import * as R from 'ramda';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import findAddressDatasource from '../../datasource/geocode.datasource';
import { createDeliveryDatasource } from '../../datasource/challenge.datasource';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddDeliveryScene = props => {
  const { deliveries, setDeliveries } = props;
  const [clientName, setClientName] = useState('');
  const [addressString, setAddressString] = useState('');
  const [weight, setWeight] = useState(0);
  const [completeAddress, setCompleteAddress] = useState({});
  const classes = useStyles();

  const handleFindAddress = async () => {
    const registerResult = await findAddressDatasource(
      R.split(' ', addressString),
    );
    console.log(registerResult);
    setCompleteAddress(registerResult);
  };

  const deliveryIsValid = R.all(a => a, [clientName, weight]);

  const handleAddRoute = async () => {
    const newDelivery = {
      clientName,
      weight,
      address: {
        street: 'R. dos Bobos',
        number: '0B',
        neighborhood: 'Vila Césamo',
        city: 'Nárnia',
        state: 'São Paulo',
        country: 'Brazil',
        geoLocalization: {
          latitude: '12.1234',
          longitude: '21.4567',
        },
      },
    };
    const createDeliveryRes = await createDeliveryDatasource(newDelivery);
    // eslint-disable-next-line no-underscore-dangle
    const createdDelivery = R.path(
      ['data', 'createdDelivery'],
      createDeliveryRes,
    );
    console.log(createDeliveryRes);
    setDeliveries(R.append(createdDelivery), deliveries);
    return createDeliveryRes;
  };

  return (
    <Container component="div" maxWidth="xs">
      <div className={classes.paper}>
        \
        <Typography component="h1" variant="h5">
          Adicionar entrega
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="clientName"
            label="Nome do cliente"
            name="clientName"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="peso"
            label="Peso"
            name="weight"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={e => setAddressString(e.target.value)}
            value={addressString}
            name="addressString"
            label="Endereço do cliente"
            id="addressString"
          />
          <Button
            variant="outlined"
            color="secondary"
            disabled={!addressString}
            onClick={handleFindAddress}
            className={classes.submit}>
            Procurar endereço
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!deliveryIsValid}
            onClick={handleAddRoute}
            className={classes.submit}>
            Adicionar Rota
          </Button>
        </div>
      </div>
    </Container>
  );
};

AddDeliveryScene.propTypes = {
  setDeliveries: PropTypes.func.isRequired,
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

export default AddDeliveryScene;
