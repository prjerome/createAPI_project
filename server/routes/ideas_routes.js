const express = require('express');
const ideasRouter = express.Router();
module.exports = ideasRouter;
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require ('../db.js');   

ideasRouter.param('ideasId', (req, res, next, id) => {
    const ideasId = Number(id);
    if (ideasId) {
        req.id = ideasId;
        next()
    }
    else {
        res.sendStatus(404);
    }
    });

ideasRouter.get('/', (req, res, next) => {
   res.status(200).send(getAllFromDatabase('ideas'));
   next(); 
});

ideasRouter.post('/', (req, res, next) => {
    const Array = ["id", "name", "description", "numWeeks", "weeklyRevenue"];
    if(Object.keys(req.query) === Array) {
        addToDatabase('ideas', req.body);
        next();
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    if (req.id) {
        getFromDatabaseById('ideas', req.id);
        next;
    }
    else {
        res.sendStatus(400);
    }
});

ideasRouter.put(':ideaId', (req, res, next) => {
    if (req.id) {
       updateInstanceInDatabase('ideas', req.body); 
        next();
    }
});

ideasRouter.delete('ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.id);
});