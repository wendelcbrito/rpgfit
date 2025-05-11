const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Exemplo de rota protegida
router.get('/protected', auth, (req, res) => {
  res.json({ message: `Bem-vindo, usuário ${req.user.username}!` });
});

module.exports = router;
