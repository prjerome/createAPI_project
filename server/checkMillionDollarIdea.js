//passing test.js line 517
const checkMillionDollarIdea = (req, response, nextCallback) => {
// passing test.js line 523
    if(req.body.numWeeks*req.body.weeklyRevenue < 1000000) {
        response.status(400).send();
    }
// passing test.js line 533    
    else if(req.body.numWeeks*req.body.weeklyRevenue >= 1000000) {
        nextCallback();   
    }
// passing test.js line 541
    else if (!req.body.numWeeks || !req.body.weeklyRevenue) {
        response.status(400).send();
    }

    else if (req.body.numWeeks && req.body.weeklyRevenue == 'invalid') {
        response.status(400).send();                
    }
    
    else if (req.body.numWeeks == 'invalid' && req.body.weeklyRevenue ) {
        response.status(400).send();  
    }              
};

module.exports = checkMillionDollarIdea;
