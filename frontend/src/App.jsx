import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';
import EditMember from './pages/EditMember';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMember />} />
          <Route path="/members" element={<ViewMembers />} />
          <Route path="/members/:id" element={<MemberDetails />} />
          <Route path="/edit/:id" element={<EditMember />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
