import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Routes from './routes';

function App() {
  return (
    <Container component="main">
      <CssBaseline />
      <Routes />
    </Container>
  );
}

export default App;
