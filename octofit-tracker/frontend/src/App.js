import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Import components
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Dashboard() {
  return (
    <main className="App-content container">
      <h2 className="App-heading">Welcome to OctoFit</h2>
      <p className="App-subheading">A lightweight tracker to help teams stay active and motivated.</p>

      <div style={{display:'flex', gap: '1rem', alignItems: 'center'}}>
        <button className="octo-btn">Get Started</button>
        <a className="octo-link" href="#learn">Learn more</a>
      </div>

      <h3 style={{marginTop: '1.75rem'}}>Recent Activities</h3>
      <table className="octo-table" aria-label="recent-activities">
        <thead>
          <tr><th>Activity</th><th>Team</th><th>Points</th></tr>
        </thead>
        <tbody>
          <tr><td>Morning Run</td><td>Red Raptors</td><td>42</td></tr>
          <tr><td>Yoga Flow</td><td>Blue Whales</td><td>18</td></tr>
          <tr><td>HIIT Session</td><td>Green Gazelles</td><td>33</td></tr>
        </tbody>
      </table>
    </main>
  );
}

function Nav() {
  return (
    <nav className="App-nav">
      <Link to="/">Dashboard</Link>
      <Link to="/activities">Activities</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/users">Users</Link>
      <Link to="/workouts">Workouts</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header container">
          <div className="App-brand">
            <img src={logo} className="App-small-logo" alt="OctoFit logo" />
            <div>
              <div className="App-title">OctoFit Tracker</div>
              <div className="App-subheading">Track activity. Build teams. Compete.</div>
            </div>
          </div>
          <Nav />
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
