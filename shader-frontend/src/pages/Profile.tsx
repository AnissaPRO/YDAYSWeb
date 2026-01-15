import { useEffect, useState } from 'react';
import api from '../api/axios';
import gsap from 'gsap';

interface UserProfile {
  id: string;
  username: string;
  xp: number;
  level: number;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    // On récupère les infos du profil au chargement
    api.get('/auth/me').then(res => {
      setUser(res.data);
      // Animation d'apparition des stats
      gsap.from(".stat-card", { opacity: 0, scale: 0.8, stagger: 0.2, duration: 1 });
    });
  }, []);

  if (!user) return <div style={{color: 'white'}}>Chargement...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mon Profil</h1>
      <div style={styles.statsRow}>
        <div className="stat-card" style={styles.statCard}>
          <h3>Niveau</h3>
          <p style={styles.statNumber}>{user.level || 1}</p>
        </div>
        <div className="stat-card" style={styles.statCard}>
          <h3>Expérience</h3>
          <p style={styles.statNumber}>{user.xp || 0} XP</p>
        </div>
      </div>
      
      <button style={styles.uploadBtn}>+ Uploader un nouveau Shader</button>
    </div>
  );
};

const styles = {
  container: { padding: '50px', background: '#0f0f0f', minHeight: '100vh', color: 'white' },
  title: { color: '#00ffcc', marginBottom: '30px' },
  statsRow: { display: 'flex', gap: '20px', marginBottom: '40px' },
  statCard: { background: '#1a1a1a', padding: '20px', borderRadius: '15px', border: '1px solid #333', textAlign: 'center' as const, flex: 1 },
  statNumber: { fontSize: '2.5rem', fontWeight: 'bold', color: '#00ffcc' },
  uploadBtn: { padding: '15px 30px', background: '#00ffcc', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }
};

export default Profile;