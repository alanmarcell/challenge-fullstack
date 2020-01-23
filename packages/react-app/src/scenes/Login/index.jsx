import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { loginDatasource } from '../../datasource/challenge.datasource';

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
  const [isLoading, setIsLoading] = useState('');
  const [password, setPassword] = useState(' ');
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      history.push('/deliveries');
    }
  });
  const handleLogin = async () => {
    setIsLoading(true);
    const registerResult = await loginDatasource({ email, password });
    setIsLoading(false);
    localStorage.setItem('user-token', registerResult.data.token);
    history.push('/deliveries');
  };

  return (
    <Container component="div" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
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
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={e => setPassword(e.target.value)}
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={classes.submit}>
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/register" component={RouterLink} variant="body2">
                Criar conta
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default RegisterScene;
