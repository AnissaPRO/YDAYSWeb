import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>SHADER LAB</div>
      <div style={styles.links}>
        <Link to="/gallery" style={styles.link}>Galerie</Link>
        <Link to="/profile" style={styles.link}>Profil</Link>
        <button onClick={logout} style={styles.logout}>Déconnexion</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '20px 50px', background: '#1a1a1a', borderBottom: '1px solid #333' },
  logo: { color: '#00ffcc', fontWeight: 'bold', fontSize: '1.2rem' },
  links: { display: 'flex', gap: '20px', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none' },
  logout: { background: 'none', border: '1px solid red', color: 'red', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }
};

export default Navbar;