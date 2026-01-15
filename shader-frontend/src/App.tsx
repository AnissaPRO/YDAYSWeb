import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';

function App() {
  // Petite astuce : on vérifie si un token existe pour protéger les pages
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        
        {/* Pages protégées : si pas de token, on renvoie vers le login */}
        <Route 
          path="/gallery" 
          element={isAuthenticated ? <Gallery /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;