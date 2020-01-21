import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { createUserDatasource } from '../../datasource/challenge.datasource';

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

const RegisterScene = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      history.push('/deliveries');
    }
  });

  const handleRegister = async () => {
    const registerResult = await createUserDatasource({ email, password });
    localStorage.setItem('user-token', registerResult.data.token);
    history.push('/deliveries');
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <div className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          variant="outlined"
          error={Boolean(password && password !== passwordConfirmation)}
          margin="normal"
          required
          fullWidth
          value={passwordConfirmation}
          onChange={({ target }) => setPasswordConfirmation(target.value)}
          name="password"
          label="Verificação de senha"
          type="password"
          id="password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          className={classes.submit}>
          Criar conta
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/" component={RouterLink} variant="body2">
              Já possui uma conta? Faça login.
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RegisterScene;
