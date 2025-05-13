const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera: "Bearer TOKEN"

    if (!token) return res.status(401).json({ message: 'Token não fornecido'});

    try {
        const decode = jwt.verify(token, 'secretao123');
        const user = await User.findById(decode.userId).select('username email');

        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        req.user = user 
        req.userId = decode.userId;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token inválido ou expirado'});
    }
};