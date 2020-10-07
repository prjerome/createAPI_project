const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db');

//handling of :minionId parameter 
minionsRouter.param('minionId', (req, res, next, id) => {
    //const minionId = Number(id);
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
    //passing
    res.send(getAllFromDatabase('minions'));
    next();
});

//passing test.js line 172
//POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence
minionsRouter.post('/', (req, res, next) => {
    res.status(201).send(addToDatabase('minions', req.body));
    next();
});


minionsRouter.get('/:minionId', (req, res, next) => {
      //passing test.js line 41
    res.status(200).send(req.minion);
  
    
    /*passing test.js line 82
    else {
        res.sendStatus(404);
    } */
    /* attempt to pass test.js like 52
   const toMatch = {
        id: ''
        name: '',
        title:'',
        weaknesses: '',
        salary: '' 
   };*/
/*
  // passing test.js line 76
   if (!req.id || typeof req.id !== 'number') {
    res.sendStatus(404);
    } */
      
        
/*attempt to pass test.js line 66
        if(req.id === minionToSend.id) {
            res.send(minionToSend);
        }*/
/*attempt to pass test.js line 52
        /*if (minionToSend.hasOwnProperty('id') && minionToSend.hasOwnProperty('name') && minionToSend.hasOwnProperty('title') && minionToSend.hasOwnProperty('salary')) {
            
        }*/
});

minionsRouter.put('/:minionId', (req, res, next) => {
     

    /* attempt #1 at test.js line 92
    if(typeof req.id === 'number' && getFromDatabaseById('minions', req.id)) {
    res.send(updateInstanceInDatabase('minions', req.body));
    }
    else {
        res.sendStatus(404)  ;
    } */

    /* attempt #2 at test.js line 92
     getFromDatabaseById('minions', '1');
     updateInstanceInDatabase('minions', '1');
    */

    //passing test.js line 135 & 147
   if(typeof req.id === 'number') {
    const toUpdateMinion = updateInstanceInDatabase('minions', req.body);
    if(toUpdateMinion) {
        res.status(200).send(toUpdateMinion);
        next();
    }
   }
    else {
        res.sendStatus(404)  ;
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    //attempt to pass test.js line 202
    /* if (getFromDatabaseById('minions', req.id)) {
        deleteFromDatabasebyId('minions', req.id);
            res.send(204);
    } */
//passing test.js line 227 & 233
    if(!req.id || !getFromDatabaseById('minions', req.id)) {
        res.sendStatus(404);
    }
    else if (req.id && getFromDatabaseById('minions', req.id)) {
        const toDelete = deleteFromDatabasebyId('minions', req.id);
        res.sendStatus(410);
        next();
    }
});

//Bonus tasks
/*minionsRouter.get('/:minionId/work', (req, res, next) => {

}); */

module.exports = minionsRouter;

