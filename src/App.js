import React, { Component } from 'react';
import './App.css';
import Signin from './components/SignIn/Signin';
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import { users, doctors, appointments } from './database/database';
import AddAppointment from './context/AddAppointment';


const initialState = {
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: ''
  },
  appointmentsList: appointments,
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (userdata) => {
    this.setState({
      user: {
        id: userdata.id,
        name: userdata.name,
        email: userdata.email,
      }
    })
  }
  

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  onAppointmentAdded = (appoint) => {
    this.setState({ appointmentsList: appoint })
  }

  render() {
    const { route, appointmentsList } = this.state;
    const filteredAppointments = appointmentsList.filter(appointment => appointment.name === this.state.user.name);
    return (
      <div className="App">
        {/* <Navigation name={this.state.user.name} isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} /> */}
        { (route === 'home')
          ? <div>
            {/*   <Doctors medics={doctors} patient={this.state.user}/>
            <Appointments agenda={filteredAppointments}/> */}
            <AddAppointment.Provider value={this.onAppointmentAdded}>
              <Home onRouteChange={this.onRouteChange} user={this.state.user} filteredAppointments={filteredAppointments}/>
            </AddAppointment.Provider>
          </div>
          : (
            route === 'signin' || route === 'signout'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    )
  }
}

export default App;
