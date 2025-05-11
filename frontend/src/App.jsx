import { useEffect, useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './services/api';

function App() {
  //const [count, setCount] = useState(0)
  const [message, setMessage] = useState('');

  /*return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}*/

useEffect(() => {
  axios.get('http://localhost:5000/api/ping')
    .then((res) => {
      setMessage(res.data.message);
    })
    .catch((err) => {
      console.error('Erro ao conectar com o backend:', err);
      setMessage('Erro ao conectar com o backend');
    });
}, []);

return (
  <div style={{ padding: '2rem '}}>
    <h1>Teste de conexão com o backend </h1>
    <p>Resposta: {message}</p>
  </div>
);
}

export default App;
