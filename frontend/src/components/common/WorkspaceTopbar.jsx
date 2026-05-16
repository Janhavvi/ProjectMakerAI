import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import './WorkspaceTopbar.css';

function WorkspaceTopbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="workspace-topbar">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/generate">Generate</Link>
      <Button variant="primary" size="sm" className="workspace-action" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default WorkspaceTopbar;
