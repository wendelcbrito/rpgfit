const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera: "Bearer TOKEN"

    if (!token) return res.status(401).json({ message: 'Token não fornecido'});

    try {
        const decode = jwt.verify(token, 'secretao123');
        req.user = decode; /// ID e dados do usuário disponíveis na rota
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token inválido ou expirado'});
    }
};