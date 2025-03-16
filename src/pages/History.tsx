import React, { useState, useEffect } from 'react';

interface AppProps {
  title?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC<AppProps> = ({ title = 'React TypeScript App' }) => {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Example API call
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className="app-container">
      <header>
        <h1>{title}</h1>
      </header>
      
      <section className="counter-section">
        <h2>Counter: {count}</h2>
        <div className="button-group">
          <button onClick={handleDecrement}>Decrement</button>
          <button onClick={handleIncrement}>Increment</button>
        </div>
      </section>

      <section className="users-section">
        <h2>Users</h2>
        {isLoading && <p>Loading users...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && (
          <ul className="users-list">
            {users.map(user => (
              <li key={user.id} className="user-item">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default App;