const express = require('express');
const meetingsRouter = express.Router();
module.exports = meetingsRouter;
const {getAllFromDatabase, addToDatabase, deleteAllFromDatabase} = require('../db.js');

meetingsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('meetings'));
});

//For `/api/meetings` POST route, no request body is necessary, as meetings are generated automatically by the server upon request. Use the provided `createMeeting` function exported from **db.js** to create a new meeting object.
meetingsRouter.post('/', (req, res, next) => {
    if(req.body) {
        addToDatabase('meetings', req.body);
    }
    else{
        res.sendStatus(404);
    }
});

meetingsRouter.delete('/', (req, res, next) => {
  res.send(deleteAllFromDatabase('meetings'));
});
