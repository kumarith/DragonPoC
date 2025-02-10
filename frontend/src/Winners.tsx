import React, { useEffect, useState } from 'react';

interface Winner {
  timestamp: string;
  winner: string;
}

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch the winners list from the API
    const fetchWinners = async () => {
      try {
        const response = await fetch('http://localhost:3000/winners');
        if (!response.ok) {
          throw new Error('Failed to fetch winners');
        }
        const data = await response.json();
        setWinners(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Winner List</h1>
      <a href="/">Back to fights</a>
      {winners.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Timestamp</th>
              <th className="px-4 py-2 border-b">Winner</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{new Date(winner.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{winner.winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No winners yet!</p>
      )}
      
    </div>
  );
};

export default Winners;
