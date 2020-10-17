import React, { Component, Fragment } from 'react';
import { users } from '../../database/database'
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onSubmitRegister = async () => { 
    if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '') {
      const user = {
        id: users[users.length-1].id + 1,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      let alreadyExists = users.filter(user => user.email === this.state.email);
      if (alreadyExists.length === 0) {
        users.push(user);
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      } else {
        alert('User already exist, try a different email')
      }
    } else {
      alert('Please, fill the remaining fields')
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.onSubmitRegister();
    }
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <Fragment>
        <div>
          <TextField 
            variant="outlined"
            label="Name"
            margin="dense"
            onChange={this.onNameChange}
            required
          />
        </div>
        <div>
          <TextField 
            variant="outlined"
            label="E-mail"
            margin="dense"
            onChange={this.onEmailChange}
            required
          />
        </div>
        <div>
          <TextField 
            variant="outlined"
            label="Password"
            margin="dense"
            onChange={this.onPasswordChange}
            onKeyDown={this.handleKeyDown}
            required
          />
        </div>
        <Button 
          style={{margin: 3}}
          variant="contained"
          color="primary"
          onClick={() => onRouteChange('signin')}> 
          Log in 
        </Button>
        <Button 
          style={{margin: 3}}
          variant="contained"
          color="primary"
          onClick={this.onSubmitRegister}> 
          Register
        </Button>
      </Fragment>
    );
  }
}

export default Register;