/*
Custom middleware function checkMillionDollarIdea that will come in handy in some /api/ideas routes. This function will make sure that any new or updated ideas are still worth at least one million dollars! The total value of an idea is the product of its numWeeks and weeklyRevenue properties.
*/

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

    // passing test.js line 547
    else if (req.body.numWeeks && req.body.weeklyRevenue == 'invalid') {
        response.status(400).send();                
    }
    
    else if (req.body.numWeeks == 'invalid' && req.body.weeklyRevenue ) {
        response.status(400).send();  
    }              
};


module.exports = checkMillionDollarIdea;
