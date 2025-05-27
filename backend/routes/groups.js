const express = require('express');
const Group = require('../models/Group');
const auth = require('../middleware/auth');
const router = express.Router();

// Crear grupo
router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  try {
    const group = new Group({ name, members: [req.user] });
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Listar grupos del usuario
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

module.exports = router;