import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/axios';
import { SharedStyles, Colors } from '../theme';


const Auth = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (type: 'login' | 'register') => {
    try {
      const endpoint = type === 'register' ? '/users' : '/auth/login';
      const response = await api.post(endpoint, { username, password });

      if (type === 'login') {
        localStorage.setItem('token', response.data.access_token);
        // Animation de sortie avant de changer de page
        gsap.to(formRef.current, { 
            opacity: 0, 
            y: -20, 
            duration: 0.5, 
            onComplete: () => {
            navigate('/gallery');
        } 
    });
      } else {
        alert("Compte créé !");
      }
    } catch (error) {
        console.error("Détails de l'erreur :", error);
        gsap.to(formRef.current, { x: 10, repeat: 5, yoyo: true, duration: 0.05 });
    }
  };

 return (
    <div style={SharedStyles.container}>
      <div ref={formRef} style={localStyles.form}> {/* Ajout de ref={formRef} ici pour GSAP */}
        <h2 style={{ color: Colors.primary, textAlign: 'center' }}>Shader Lab</h2>
        
        <input 
          style={SharedStyles.input} 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} // On utilise setUsername !
        />
        
        <input 
          style={SharedStyles.input} 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} // On utilise setPassword !
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button style={SharedStyles.button} onClick={() => handleAuth('login')}>
            Se connecter
          </button>
          <button 
            style={{ ...SharedStyles.button, background: 'none', color: Colors.primary, border: `1px solid ${Colors.primary}` }} 
            onClick={() => handleAuth('register')}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
};


const localStyles = {
  form: {
    background: Colors.cardBg,
    padding: '40px',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    width: '350px'
  }
};

export default Auth;