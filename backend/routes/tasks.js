const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

// Criar uma nova tarefa
router.post('/', auth, taskController.createTask);

// Buscar todas as tarefas do usuário logado
router.get('/', auth, taskController.getTasks);

// Atualizar uma tarefa específica
router.put('/:id', auth, taskController.updateTask);

// Deletar uma tarefa específica
router.delete('/:id', auth, taskController.deleteTask);

// Exemplo de rota protegida
router.get('/protected', auth, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.user.username}!` });
});

module.exports = router;
