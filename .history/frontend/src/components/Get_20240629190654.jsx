import React, { useEffect, useState } from 'react';

function Get() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users');
      const result = await response.json();
      setUsers(result);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.user} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Get;
