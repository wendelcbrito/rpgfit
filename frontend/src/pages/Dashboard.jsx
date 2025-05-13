import { useEffect, useState } from 'react';
import UserStats from '../components/UserStats';
import api from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTasks(res.data))
    .catch(() => setTasks([]));

    api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
  }, []);

  const handleComplete = async (taskId, newStatus) => {
    const token = localStorage.getItem('token');

    try {
      const userBefore = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      await api.put(`/tasks/${taskId}`, { completed: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const [tasksRes, userRes] = await Promise.all([
        api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setTasks(tasksRes.data);
      setUser(userRes.data);

      const xpGanho = userRes.data.xp - userBefore.data.xp;
      const levelUp = userRes.data.level > userBefore.data.level;

      if (levelUp) {
        setFeedback('🎉 Level Up!');
      } else if (xpGanho > 0) {
        setFeedback(`+${xpGanho} XP`);
      }

      setTimeout(() => setFeedback(''), 2000);

    } catch (err) {
      console.error('Erro ao concluir tarefa', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/tasks', {
        title,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const [tasksRes, userRes] = await Promise.all([
        api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setTasks(tasksRes.data);
      setUser(userRes.data);
      setTitle('');
      setDescription('');

    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <UserStats user={user} />

      {feedback && (
        <div className="text-green-600 font-bold text-xl mb-4 animate-bounce">
          {feedback}
        </div>
      )}

      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Minhas Tarefas</h2>

      <form onSubmit={handleCreate} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Criar Tarefa
        </button>
      </form>

      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task._id} className="bg-gray-100 p-3 rounded-md flex items-start gap-2 shadow-sm">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task._id, !task.completed)}
              className="mt-1 accent-indigo-600"
            />
            <div>
              <strong className="block text-gray-800">{task.title}</strong>
              <span className="text-gray-600 text-sm">{task.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
