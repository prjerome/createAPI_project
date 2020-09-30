const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, addToDatabase } = require('../db');

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const minionToPost = req.query;

    if(minionToPost) {

    }
});

module.exports = minionsRouter;

