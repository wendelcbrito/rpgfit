const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = 'secretao123'; //depois mover para env

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hash });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
 };

 exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado'});
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Senha inválida '});

        const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1d' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
 };

 exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('username xp level');
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado'});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar perfil do usuário'});
    }
 };