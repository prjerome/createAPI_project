/*
/api/ideas
GET /api/ideas to get an array of all ideas.
POST /api/ideas to create a new idea and save it to the database.
GET /api/ideas/:ideaId to get a single idea by id.
PUT /api/ideas/:ideaId to update a single idea by id.
DELETE /api/ideas/:ideaId to delete a single idea by id.
*/

const express = require('express');
const checkMillionDollarIdea = require('../checkMillionDollarIdea.js');
const ideasRouter = express.Router();
const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require ('../db');   

ideasRouter.param('ideasId', (req, res, next, id) => {
   const idea = getFromDatabaseById('ideas', id);
   if (idea) {
       req.idea = idea;
       next();
   }
   else {
       res.send(404).send();
   }
});

    
ideasRouter.get('/', (req, res, next) => {
    //passing test.js line 248 and 257
   res.status(200).send(getAllFromDatabase('ideas'));
});

/* ideasRouter.post('/', (req, res, next) => {
    //passing test.js line 410. This was a fun one!
    const ideasArray = getAllFromDatabase('ideas');
    req.body.id = ideasArray.length + 1;
     if (checkMillionDollarIdea(req.body.numweeks, req.body.weeklyRevenue)) {
        res.status(201).send(addToDatabase('ideas', req.body));
     }
});

*/
ideasRouter.get('/:ideaId', (req, res, next) => {
   res.send(req.idea)
});
/*
ideasRouter.put('/:ideaId', (req, res, next) => {
}
);


ideasRouter.delete('/:ideaId', (req, res, next) => {
       const toDelete = (deleteFromDatabasebyId('ideas', req.params.id));
       if(toDelete) {
           res.status(204).send(toDelete);
       }
    });
     */

module.exports = ideasRouter;
