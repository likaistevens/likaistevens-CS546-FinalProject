const billRoutes = require('./bills');
const userRoutes = require('./users');

const constructorMethod = (app) => {
  app.use('/api/bill', billRoutes);
  app.use('/api/user', userRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;