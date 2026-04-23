import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="team-title">TEAM SPD</h1>
      <p className="team-subtitle">Welcome to the SPD Team Management Platform</p>

      <div className="home-card">
        <h3>Manage Team</h3>
        <div className="btn-container">
          <Link to="/add" className="btn">Add Member</Link>
          <Link to="/members" className="btn btn-secondary">View Members</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
