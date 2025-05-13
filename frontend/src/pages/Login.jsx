import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;

      localStorage.setItem('token', token);
      navigate('/dashboard');
     // setMsg('✅ Login realizado com sucesso!');

      // Redirecionamento ou navegação futura aqui
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || 'Erro ao fazer login.';
      setMsg(`❌ ${errorMsg}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login - RPGFit</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>
          Entrar
        </button>
      </form>
      {msg && <p style={{ marginTop: '1rem' }}>{msg}</p>}
    </div>
  );
}

export default Login;
