import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ShaderCard from '../components/ShaderCard';
import api from '../api/axios';

// On définit ce qu'est un Shader pour TypeScript
interface Shader {
  id: string;
  title: string;
  author: { username: string };
  createdAt: string;
}

const Gallery = () => {
  const [shaders, setShaders] = useState<Shader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupération des vrais shaders depuis ton Backend NestJS
    api.get('/shaders')
      .then(res => {
        setShaders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur galerie:", err);
        setLoading(false);
      });
  }, []);

  // Animation GSAP : les cartes apparaissent une par une
  useGSAP(() => {
    if (!loading && shaders.length > 0) {
      gsap.from(".shader-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1, // L'effet de cascade
        ease: "power2.out"
      });
    }
  }, [loading, shaders]);

  if (loading) return <div style={styles.loader}>Chargement du Lab...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Community Shaders</h1>
        <p style={styles.subtitle}>Explore les dernières créations de la communauté.</p>
      </header>

      <div style={styles.grid}>
        {shaders.length > 0 ? (
          shaders.map((s) => (
            <ShaderCard 
              key={s.id} 
              title={s.title} 
              author={s.author.username} 
              date={new Date(s.createdAt).toLocaleDateString()} 
            />
          ))
        ) : (
          <p style={{color: '#666'}}>Aucun shader trouvé... sois la première à en uploader un !</p>
        )}
      </div>
    </div>
  );
};

// Styles pour la galerie
const styles = {
  container: { padding: '40px', minHeight: '100vh', background: '#0f0f0f' },
  header: { marginBottom: '40px' },
  title: { color: '#00ffcc', fontSize: '2.5rem', margin: 0 },
  subtitle: { color: '#888', marginTop: '10px' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '25px' 
  },
  loader: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#00ffcc', background: '#0f0f0f' }
};


export default Gallery;