const checkMillionDollarIdea = (req, res, next) => { //define a function that checks if a given idea is a 'million dollar idea'
    const { numWeeks, weeklyRevenue } = req.body; //set the 'numWeeks' and 'weeklyRevenue' variables equal to the aforementioned properties of the passed-in 'req' object
    const isMillionDollarIdea = numWeeks * weeklyRevenue >= 1000000? true: false; //set a boolean variable 'isMillionDollarIdea' equal to the result of testing whether 'numWeeks' * 'weeklyRevenue' is greater than one million
    if(isMillionDollarIdea) { //if 'isMillionDollarIdea' evaluates to true
        next(); //call the next next processing middleware
    } else { //otherwise
        res.status(400).send(); //send a '400 Bad Request' response
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
