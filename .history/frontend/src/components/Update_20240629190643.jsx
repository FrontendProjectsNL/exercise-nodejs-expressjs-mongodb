import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/users/${id}`);
      const result = await response.json();
      setUser(result.user);
      setEmail(result.email);
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, email }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default Update;
