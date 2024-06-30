import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/create">Create Employee</NavLink>
      </nav>
    </div>
  );
}
