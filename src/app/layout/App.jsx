import React, { Component } from 'react';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import EventForm from '../../features/events/EventForm/EventForm';

class App extends Component {
  render() {
    return (
      <>
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <>
              <NavBar />
              <Container className='main'>
                <Route path='/events' component={EventDashboard} />
                <Route path='/events/:id' component={EventDetailedPage} />
                <Route path='/people' component={PeopleDashboard} />
                <Route path='/profile/:id' component={UserDetailedPage} />
                <Route path='/settings' component={SettingsDashboard} />
                <Route path='/createEvent' component={EventForm} />
              </Container>
            </>
          )}
        />
      </>
    );
  }
}

export default App;
