import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(response.data);
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]);

  if (loading) return <div className="loader"></div>;
  if (error) return <div className="no-data">{error}</div>;
  if (!member) return <div className="no-data">Member not found.</div>;

  return (
    <>
      <header className="page-header">
        <Link to="/" className="header-title">TEAM SPD</Link>
        <nav className="header-nav">
          <Link to={`/edit/${id}`} className="nav-link" style={{marginRight: '10px', background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px'}}>Edit Member</Link>
          <Link to="/members" className="nav-link">Back to Members</Link>
        </nav>
      </header>

      <div className="page-container">
        <div className="detail-card">
          <div className="detail-image-sec">
            {member.image ? (
              <img 
                src={`http://localhost:5000/uploads/${member.image}`} 
                alt={member.name}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'
                }}
              />
            ) : (
              <img src="https://via.placeholder.com/600x400?text=No+Image" alt="Placeholder" />
            )}
          </div>
          
          <div className="detail-info-sec">
            <h2 className="detail-name">{member.name}</h2>
            <div className="detail-degree">{member.degree} - {member.year}</div>
            
            <div className="detail-grid">
              <div className="detail-item">
                <h4>Roll Number</h4>
                <p>{member.rollNumber}</p>
              </div>
              
              <div className="detail-item">
                <h4>Project</h4>
                <p>{member.aboutProject || 'N/A'}</p>
              </div>
              
              <div className="detail-item">
                <h4>Certificate</h4>
                <p>{member.certificate || 'N/A'}</p>
              </div>
              
              <div className="detail-item">
                <h4>Internship</h4>
                <p>{member.internship || 'N/A'}</p>
              </div>
              
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <h4>Aim</h4>
                <p>{member.aboutYourAim || 'N/A'}</p>
              </div>
              
              <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                <h4>Hobbies</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {member.hobbies ? member.hobbies.split(',').map((hobby, index) => (
                    <span key={index} style={{ 
                      background: 'rgba(59, 130, 246, 0.2)', 
                      color: '#60a5fa',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.85rem'
                    }}>
                      {hobby.trim()}
                    </span>
                  )) : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDetails;
