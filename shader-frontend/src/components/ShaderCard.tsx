import { useRef } from 'react';
import gsap from 'gsap';

interface ShaderCardProps {
  title: string;
  author: string;
  date: string;
}

const ShaderCard = ({ title, author, date }: ShaderCardProps) => {
  const cardRef = useRef(null);

  // Animation au survol
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { 
      scale: 1.05, 
      borderColor: '#00ffcc', 
      boxShadow: '0 0 20px rgba(0, 255, 204, 0.2)',
      duration: 0.3 
    });
  };

  // Animation quand la souris sort
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { 
      scale: 1, 
      borderColor: '#333', 
      boxShadow: 'none',
      duration: 0.3 
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="shader-card" 
      style={styles.card}
    >
      <div style={styles.previewPlaceholder}>
        <span style={{opacity: 0.3, fontSize: '0.8rem'}}>GLSL PREVIEW</span>
      </div>
      <div style={{padding: '15px'}}>
        <h3 style={{margin: 0, color: '#00ffcc', fontSize: '1.1rem'}}>{title}</h3>
        <p style={{fontSize: '0.75rem', color: '#888', marginTop: '5px'}}>
          By {author} • {date}
        </p>
      </div>
    </div>
  );
};

const styles = {
  card: { 
    background: '#1a1a1a', 
    borderRadius: '12px', 
    overflow: 'hidden', 
    border: '1px solid #333',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  previewPlaceholder: { 
    height: '140px', 
    background: '#0a0a0a', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderBottom: '1px solid #333' 
  },
};

export default ShaderCard;