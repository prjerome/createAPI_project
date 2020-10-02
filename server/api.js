const express = require('express');
const minionsRouter = require('./routes/minions');
const apiRouter = express.Router();
const ideasRouter = require('./routes/ideas');
const meetingsRouter = require('./routes/meetings_routes');

apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/meetings', meetingsRouter);


module.exports = apiRouter;
