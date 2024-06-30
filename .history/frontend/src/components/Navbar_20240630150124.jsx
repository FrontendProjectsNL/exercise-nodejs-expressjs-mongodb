import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>

        <Link to="/create">Create Employee</Link>
      </nav>
    </div>
  );
}
