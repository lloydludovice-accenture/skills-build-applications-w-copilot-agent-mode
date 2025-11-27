import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        
        console.log('Fetching leaderboard from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed leaderboard:', leaderboardList);
        
        setLeaderboard(leaderboardList);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="App-content container"><p>Loading leaderboard...</p></div>;
  if (error) return <div className="App-content container"><p style={{color: 'red'}}>Error: {error}</p></div>;

  return (
    <main className="App-content container">
      <h2 className="App-heading">Leaderboard</h2>
      
      {leaderboard.length === 0 ? (
        <p>No leaderboard data found.</p>
      ) : (
        <table className="octo-table" aria-label="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id || index}>
                <td>{index + 1}</td>
                <td>{entry.user_name || entry.username || 'N/A'}</td>
                <td>{entry.points || entry.total_points || 0}</td>
                <td>{entry.activity_count || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Leaderboard;
