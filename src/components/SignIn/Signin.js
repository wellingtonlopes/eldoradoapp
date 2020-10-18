import React, { Component, Fragment } from 'react';
import { users } from '../../database/database'
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core'

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  // checks if the user's credentials matches with any in the database, if so load the user on App.js and set the route change to 'home'
  onSubmitSignIn = async () => {
    const userArray = users.filter(user => this.state.signInEmail === user.email && this.state.signInPassword === user.password);
    let user;
    if (userArray[0] !== undefined) {
      user = userArray[0];
    } else {
      user = {};
    }
    if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
    } else {
      alert('Could not find a user with those credentials')
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSubmitSignIn();
    }
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <Fragment>
        <div>
          <TextField 
            variant="outlined"
            label="E-mail"
            margin="dense"
            type="email"
            onChange={this.onEmailChange}
            required
          />
        </div>
        <div>
          <TextField 
            variant="outlined"
            label="Password"
            margin="dense"
            type="password"
            onChange={this.onPasswordChange}
            onKeyDown={this.handleKeyDown}
            required
          />
        </div>
        <Button 
          style={{margin: 3}}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => onRouteChange('register')}> 
          Register 
        </Button>
        <Button 
          style={{margin: 3}}
          variant="contained"
          color="primary"
          onClick={this.onSubmitSignIn}> 
          Sign in 
        </Button>
      </Fragment>
    );
  }
}

export default Signin;