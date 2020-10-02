 express = require('express');
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

//passing test.js line 11 and line 20
minionsRouter.get('/', (req, res, next) => {
    //passing
    res.send(getAllFromDatabase('minions'));
    next();
});

minionsRouter.post('/', (req, res, next) => {
    res.status(201).send(addToDatabase('minions', req.body));
    next();
});


minionsRouter.get('/:minionId', (req, res, next) => {
   /* attempt to pass test.js like 52
   const toMatch = {
        id: ''
        name: '',
        title:'',
        weaknesses: '',
        salary: '' 
   };*/

  // passing test.js line 76
   if (!req.id || typeof req.id !== 'number') {
    res.sendStatus(404);
    } 
        const minionToSend = getFromDatabaseById('minions', req.id);
        //passing test.js line 41
        if(minionToSend) {
            res.send(minionToSend);
        }
        //passing test.js line 82
        else {
            res.sendStatus(404);
        }
        
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

    ///passing test.js line 135 & 147
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
    const toDelete = deleteFromDatabasebyId('minions', req.id);
    if (toDelete) {
        res.sendStatus(410);
        next();
    }
    else {
        res.sendStatus(204);
    }
});

/*minionsRouter.get('/:minionId/work', (req, res, next) => {

}); */

module.exports = minionsRouter;

