// File: frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateEventPage from './pages/CreateEventPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import UpcomingEventsPage from './pages/UpcomingEventsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/event/:id" component={EventPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/create-event" component={CreateEventPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/event/:id" component={EventDetailsPage} />
          <Route path="/upcoming-events" component={UpcomingEventsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
