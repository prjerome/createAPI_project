// passing test.js test suite line 6, /api/minions routes
const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db');

//handling of :minionId parameter 
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion; 
        req.id = id;
        next();
   }
    else {
        res.sendStatus(404);
    }
});

//passing test.js line 11 and line 20
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
    next();
});


//POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence
//passing test.js line 172
minionsRouter.post('/', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions');
    req.body.id = minionsArray.length +1;
    res.status(201).send(addToDatabase('minions', req.body));
    
});


minionsRouter.get('/:minionId', (req, res, next) => {
      //passing test.js line 41
    res.status(200).send(req.minion);
});

//passing test.js test suite line 90
minionsRouter.put('/:minionId',  (req, res, next) => {
      const updated =  updateInstanceInDatabase('minions', req.body);
        res.send(updated);
});

//passing test.js test suite line 200
minionsRouter.delete('/:minionId', (req, res, next) => {
    const toDeleteMinion = deleteFromDatabasebyId('minions', req.id);
    if(toDeleteMinion) {
        res.status(204).send(toDeleteMinion);
    }
});

module.exports = minionsRouter;
