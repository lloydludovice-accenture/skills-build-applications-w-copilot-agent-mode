import logo from './logo.svg';
import './App.css';

function Nav() {
  return (
    <nav className="App-nav">
      <a href="#dashboard">Dashboard</a>
      <a href="#activities">Activities</a>
      <a href="#teams">Teams</a>
      <a href="#leaderboard">Leaderboard</a>
    </nav>
  );
}

function App() {
  return (
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
    </div>
  );
}

export default App;
