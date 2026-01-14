import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AxiosError } from 'axios';
import api from './api/axios'; 

function App() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  
  // 1. On crée des états pour stocker ce que l'utilisateur écrit
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Animation d'entrée existante
  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }, { scope: containerRef });

  // 2. La fonction magique qui lie tout
  const handleAuth = async (type: 'login' | 'register') => {
    // ALERT DE DEBUG VITAL
    alert(`Click détecté pour : ${type} ! Values: ${username}/${password}`); 

    if (!username || !password) {
      alert("Champs vides !");
      return;
    }

    try {
      const endpoint = type === 'register' ? '/users' : '/auth/login'; // Changé /users/register -> /users pour matcher votre test Postman
      console.log(`Envoi requête vers ${endpoint}...`);
      
      const response = await api.post(endpoint, { username, password });
      console.log("Réponse reçue :", response.data);

      if (type === 'login') {
        localStorage.setItem('token', response.data.access_token);
        gsap.to(formRef.current, { y: -500, opacity: 0, duration: 0.8, ease: 'power4.in' });
        alert("Connecté au Shader Lab ! Token reçu.");
      } else {
        alert("Compte créé avec succès ! Connectez-vous maintenant.");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string | string[] }>;
      console.error("ERREUR AUTH :", err);
      
      const message = err.response?.data?.message || err.message || "Erreur inconnue";
      alert(`Erreur API : ${JSON.stringify(message)}`);

      if (formRef.current) {
        gsap.to(formRef.current, {
          x: 10,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          onComplete : () => {gsap.set(formRef.current, { x: 0 })} 
        });
      }
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <div ref={formRef} style={styles.form}>
        <h2 style={styles.title}>Shader Lab</h2>
        
        <input 
          type="text" 
          placeholder="Username" 
          style={styles.input} 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          style={styles.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleAuth('login')} 
            style={styles.button}
          >
            Se connecter
          </button>
          
          <button 
            onClick={() => handleAuth('register')} 
            style={{ ...styles.button, background: '#333', color: '#00ffcc', border: '1px solid #00ffcc' }}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0f0f0f', color: 'white', fontFamily: 'sans-serif' },
  form: { background: '#1e1e1e', padding: '40px', borderRadius: '15px', display: 'flex', flexDirection: 'column' as const, gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  title: { textAlign: 'center' as const, fontSize: '2rem', marginBottom: '10px', color: '#00ffcc' },
  input: { padding: '12px', borderRadius: '5px', border: 'none', background: '#333', color: 'white', outline: 'none' },
  button: { padding: '12px', borderRadius: '5px', border: 'none', background: '#00ffcc', color: 'black', fontWeight: 'bold', cursor: 'pointer' }
};

export default App;