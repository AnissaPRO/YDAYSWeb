// src/theme.ts

export const Colors = {
  background: '#0f0f0f',
  cardBg: '#1e1e1e',
  primary: '#00ffcc', // Ton vert néon
  text: '#ffffff',
  textSecondary: '#888888',
  border: '#333333',
  error: '#ff4444'
};

export const SharedStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: Colors.background,
    color: Colors.text,
    fontFamily: 'sans-serif',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    background: '#333',
    color: 'white',
    outline: 'none',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    background: Colors.primary,
    color: 'black',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
  }
};