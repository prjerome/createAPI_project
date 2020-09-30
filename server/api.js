const express = require('express');
const minionsRouter = require('./routes/minions');
const apiRouter = express.Router();
const mionionsRouter = require('./routes/minions');

apiRouter.use('/minions', minionsRouter);


module.exports = apiRouter;
