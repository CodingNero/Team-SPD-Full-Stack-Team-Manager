import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <header className="page-header">
        <Link to="/" className="header-title">TEAM SPD</Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add" className="nav-link">Add Member</Link>
        </nav>
      </header>

      <div className="page-container" style={{ maxWidth: '1200px' }}>
        <h2 className="page-title">MEET OUR AMAZING TEAM</h2>
        
        {loading ? (
          <div className="loader"></div>
        ) : error ? (
          <div className="no-data">{error}</div>
        ) : members.length === 0 ? (
          <div className="no-data">No team members found. Be the first to join!</div>
        ) : (
          <div className="members-grid">
            {members.map(member => (
              <div className="member-card" key={member._id}>
                <div className="member-image-container">
                  {member.image ? (
                    <img 
                      src={`http://localhost:5000/uploads/${member.image}`} 
                      alt={member.name} 
                      className="member-image" 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                      }}
                    />
                  ) : (
                    <img src="https://via.placeholder.com/300x200?text=No+Image" alt="Placeholder" className="member-image" />
                  )}
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">Roll Number: {member.rollNumber}</p>
                  <Link to={`/members/${member._id}`} className="btn">VIEW DETAILS</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewMembers;
