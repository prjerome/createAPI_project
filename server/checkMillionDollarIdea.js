const checkMillionDollarIdea = (numWeeks, weeklyRevenue) => {
    const totalValueIdea = numWeeks * weeklyRevenue;
    if(totalValueIdea > 1000000) {
        
    }
    else {
        console.log('Idea not worth a million');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
