import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        
        console.log('Fetching workouts from:', codespaceUrl);
        
        const response = await fetch(codespaceUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = Array.isArray(data) ? data : (data.results || []);
        console.log('Processed workouts:', workoutsList);
        
        setWorkouts(workoutsList);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="App-content container"><p>Loading workouts...</p></div>;
  if (error) return <div className="App-content container"><p style={{color: 'red'}}>Error: {error}</p></div>;

  return (
    <main className="App-content container">
      <h2 className="App-heading">Workouts</h2>
      
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <table className="octo-table" aria-label="workouts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.id}</td>
                <td>{workout.name || 'N/A'}</td>
                <td>{workout.type || 'N/A'}</td>
                <td>{workout.duration || 'N/A'}</td>
                <td>{workout.calories || 'N/A'}</td>
                <td>{workout.created_at || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Workouts;
