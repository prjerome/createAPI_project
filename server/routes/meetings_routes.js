const express = require('express');
const meetingsRouter = express.Router();
module.exports = meetingsRouter;
const {getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting} = require('../db.js');

meetingsRouter.get('/', (req, res, next) => {
    //passes test.js line 586 and 595
    res.status(200).send(getAllFromDatabase('meetings'));
});

//For `/api/meetings` POST route, no request body is necessary, as meetings are generated automatically by the server upon request. Use the provided `createMeeting` function exported from **db.js** to create a new meeting object.
meetingsRouter.post('/', (req, res, next) => {
    //passing test.js line 615 and 628
   res.status(201).send(addToDatabase('meetings', (createMeeting())));
});

meetingsRouter.delete('/', (req, res, next) => {
    //passing test.js line 661
  res.status(204).send(deleteAllFromDatabase('meetings'));
});
