import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        
        console.log('Fetching teams from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed teams:', teamsList);
        
        setTeams(teamsList);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="App-content container"><p>Loading teams...</p></div>;
  if (error) return <div className="App-content container"><p style={{color: 'red'}}>Error: {error}</p></div>;

  return (
    <main className="App-content container">
      <h2 className="App-heading">Teams</h2>
      
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <table className="octo-table" aria-label="teams-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.name || 'N/A'}</td>
                <td>{team.description || 'N/A'}</td>
                <td>{team.member_count || 0}</td>
                <td>{team.created_at || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Teams;
