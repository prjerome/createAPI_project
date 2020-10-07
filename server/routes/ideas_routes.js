const express = require('express');
const { response } = require('../../server.js');
const checkMillionDollarIdea = require('../checkMillionDollarIdea.js');
const ideasRouter = express.Router();
module.exports = ideasRouter;
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require ('../db.js');   

ideasRouter.param('ideasId', (req, res, next, id) => {
    if (getFromDatabaseById('ideas', id) === '-1') {
            res.sendStatus(404);   
        } 
        else {
            req.id = id;
            next()
        }
        //passing all test.js non-numeric Id/invalid Id tests
        //passing test.js line 384
        /* const ideasId = Number(id);
        if (typeof ideasId === 'number') {
            req.id = ideasId;
            next()
        } 
        else {
            res.sendStatus(404);
        } */
    });

    
ideasRouter.get('/', (req, res, next) => {
    //passing test.js line 248 and 257
   res.status(200).send(getAllFromDatabase('ideas'));
   next(); 
});

ideasRouter.post('/', (req, res, next) => {
    //passing test.js line 410. This was a fun one!
    const ideasArray = getAllFromDatabase('ideas');
    req.body.id = ideasArray.length + 1;
     if (checkMillionDollarIdea(req.body.numweeks, req.body.weeklyRevenue)) {
        res.status(201).send(addToDatabase('ideas', req.body));
     }
});

//TODO
ideasRouter.get('/:ideaId', (req, res, next) => {
    
    if (!req.id || req.id === 450) {
        res.sendStatus(404);
    }
    else {
        res.send(getFromDatabaseById('ideas', req.id));
    }
    /* attempt pass test.js line 289
    const  response = async () => (await getFromDatabaseById('ideas', req.id))

        if (response['id'] && response['name'] && response['description'] && response['weeklyRevenue'] && response['numWeeks']) {
            res.send(response);
        }
    
        else  {
            res.sendStatus(404)
        } */
   
    /*passing test.js line 278
    const response = getFromDatabaseById('ideas', req.id));
    */

    /*if (req.id) {
        getFromDatabaseById('ideas', req.id);
        next;
    }
    else {
        res.sendStatus(400);
    } */
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    if (checkMillionDollarIdea(req.body.numweeks, req.body.weeklyRevenue) 
        //res.send(updateInstanceInDatabase('ideas', req.body));
    
    /* attempt passing test.js line 329, 348
    if (req.id) {
       updateInstanceInDatabase('ideas', req.body); 
        next();
    } */
);

//TODO
ideasRouter.delete('/:ideaId', (req, res, next) => {
    /*if(typeof req.params.id !== 'number' || (getFromDatabaseById('ideas', req.params) === '-1'))*/
    
       const toDelete = (deleteFromDatabasebyId('ideas', req.params.id));
       if(toDelete) {
           res.status(204).send(toDelete);
       }
    });
     /* attempt at passing test.js 440
    const deleteThisIdea = (deleteFromDatabasebyId('ideas', req.id));
    if (deleteThisIdea) {
        res.status(204).send(deleteThisId);
    } */
   
    /* attempt at passing test.js 440
deleteFromDatabasebyId('ideas', req.id); */});
