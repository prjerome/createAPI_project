const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minionId = Number(id);
    if(minionId) {
        req.id = minionId;
        next();
    }
    else {
        res.sendStatus(404);
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
    next();
});

minionsRouter.post('/', (req, res, next) => {
    res.status(201).send(addToDatabase('minions', req.body));
    next();
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions');
    const firstFoundMinion = minionsArray.find(minion => minion.id === req.id);
    if(firstFoundMinion) {
        res.status(200).send(firstFoundMinion);
        next();
    }
   /* const idMinion = getFromDatabaseById('minions', req.id);
    if(idMinion) {
        res.status(200).send(idMinion);
        next();
    } */
    else {
        res.sendStatus(404);
    }    
});

minionsRouter.put('/:minionId', (req, res, next) => {
   if(typeof req.id === 'number') {
    const toUpdateMinion = updateInstanceInDatabase('minions', req.body);
    if(toUpdateMinion) {
        res.status(200).send(getFromDatabaseById('minions', req.id));
        next();
    }
   }
    else {
        res.sendStatus(404)  ;
    } 
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const toDelete = deleteFromDatabasebyId('minions', req.id);
    if (toDelete) {
        res.sendStatus(410);
        next();
    }
    else {
        res.sendStatus(204);
    }
});


module.exports = minionsRouter;

