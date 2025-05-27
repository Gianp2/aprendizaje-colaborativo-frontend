const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes);
const groupRoutes = require('./routes/groups');
app.use('/api/groups', groupRoutes);