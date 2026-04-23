import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    degree: '',
    aboutProject: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutYourAim: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (image) {
        data.append('image', image);
      }

      await axios.post('http://localhost:5000/api/members', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      navigate('/members');
    } catch (err) {
      console.error(err);
      setError('Failed to add member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="page-header">
        <Link to="/" className="header-title">TEAM SPD</Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/members" className="nav-link">View Members</Link>
        </nav>
      </header>

      <div className="page-container">
        <h2 className="page-title">Add Team Member</h2>
        
        <div className="form-container">
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Roll Number *</label>
              <input type="text" name="rollNumber" className="form-control" required value={formData.rollNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Year *</label>
              <input type="text" name="year" className="form-control" required value={formData.year} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Degree *</label>
              <input type="text" name="degree" className="form-control" required value={formData.degree} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>About Project</label>
              <textarea name="aboutProject" className="form-control" value={formData.aboutProject} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label>Hobbies (comma separated)</label>
              <input type="text" name="hobbies" className="form-control" value={formData.hobbies} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Certificate</label>
              <input type="text" name="certificate" className="form-control" value={formData.certificate} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Internship</label>
              <input type="text" name="internship" className="form-control" value={formData.internship} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>About Your Aim</label>
              <textarea name="aboutYourAim" className="form-control" value={formData.aboutYourAim} onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <input type="file" accept="image/*" className="form-control file-input" onChange={handleImageChange} />
            </div>

            <button type="submit" className="btn submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMember;
