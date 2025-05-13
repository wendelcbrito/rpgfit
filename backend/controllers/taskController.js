const Task = require('../models/Task');
const User = require('../models/User');

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: false,
      xp: req.body.xp || 10,
      user: req.userId
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

// Listar todas as tarefas do usuário
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    console.error('Erro ao buscar tarefas:', err);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

// Buscar tarefa específica
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json(task);
  } catch (err) {
    console.error('Erro ao buscar tarefa:', err);
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
};

// Atualizar uma tarefa (e acumular XP se concluída)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });

    const wasIncomplete = !task.completed;
    const xpReward = task.xp || 10;

    // Atualiza campos permitidos
    if (req.body.completed !== undefined) task.completed = req.body.completed;
    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;

    const updatedTask = await task.save();

    // Se marcado como concluído agora, acumula XP e verifica level up
    if (wasIncomplete && updatedTask.completed) {
      const user = await User.findById(req.userId);
      user.xp += xpReward;
      // Level up a cada 100 XP
      while (user.xp >= 100) {
        user.xp -= 100;
        user.level += 1;
      }
      await user.save();
    }

    res.json(updatedTask);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
