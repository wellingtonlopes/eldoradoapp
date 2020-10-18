import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { AssignmentInd } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { users } from '../../database/database';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 80,
    width: 80
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  }

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  }
  const onSubmitRegister = () => {
    const user = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name: registerName,
      email: registerEmail,
      password: registerPassword
    }
    let alreadyExists = users.filter(user => user.email === registerEmail);
    if (alreadyExists.length === 0) {
      users.push(user);
      if (user.id) {
        props.loadUser(user);
        props.onRouteChange('home');
      }
    } else {
      alert('User already exist, try a different email')
      props.onRouteChange('register');
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmitRegister();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentInd style={{ fontSize: 60 }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={onNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmitRegister}
          >
            Register
          </Button>
          <Grid container>

            <Grid item>
              <Link href="#" variant="body2" onClick={() => props.onRouteChange('signin')}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

export default Register;