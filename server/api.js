const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
} = require('./db'); //import createMeeting, getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId, and deleteAllFromDatabase from './db.js'

const checkMillionDollarIdea = require('./checkMillionDollarIdea');  //import checkMillionDollarIdea from './checkMillionDollarIdea.js'

const express = require('express');
const apiRouter = express.Router(); //set 'apiRouter' equal to an express router

//GET /api/minions to get an array of all minions
apiRouter.get('/minions', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions'); //set 'minionsArray' equal to the 'allMinions' array in db.js
    res.status(200).send(minionsArray); //send a '200 OK' response, along with the 'minionsArray'
});

//GET /api/ideas to get an array of all ideas
apiRouter.get('/ideas', (req, res, next) => {
    const ideasArray = getAllFromDatabase('ideas'); //set 'ideasArray' equal to the 'allIdeas' array in db.js
    res.status(200).send(ideasArray); //send a '200 OK' response, along with the 'ideasArray'
});

//GET /api/meetings to get an array of all meetings
apiRouter.get('/meetings', (req, res, next) => {
    const meetingsArray = getAllFromDatabase('meetings'); //set 'meetingsArray' equal to the 'allMeetings' array in db.js
    res.status(200).send(meetingsArray); //send a '200 OK' response, along with the 'meetingsArray'
});

//POST /api/minions to create a new minion and save it to the database
apiRouter.post('/minions', (req, res, next) => {
    const { name, title, salary, weaknesses } = req.body; //define 'name', 'title', 'salary', and 'weaknesses' variables equal to those passed in the request body
    const minionInstance = { //create a new minionInstance
        name: name,
        title: title,
        salary: salary,
        weaknesses: weaknesses
    };
    if(minionInstance) { //if 'minionInstance' evaluates to truthy
        const addedMinion = addToDatabase('minions', minionInstance); //add minionInstance to the 'allMinions' database
        res.status(201).send(addedMinion); //send '201 Created' response, along with the addedMinion
    } else { //otherwise
        res.status(400).send('A minion object requires name, title, salary, and weaknesses properties.'); //send a '400 Bad Request' response, along with failure information
    }
});

//POST /api/ideas to create a new idea and save it to the database, once it has passed through the 'checkMillionDollarIdea' middleware
apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    const { name, description, numWeeks, weeklyRevenue } = req.body; //set 'name', 'description', 'numWeeks', and 'weeklyRevenue' variables equal to those passed in the request body
    const ideaInstance = { //create a new idea object
        name: name,
        description: description,
        numWeeks: numWeeks,
        weeklyRevenue: weeklyRevenue
    };
    if(ideaInstance) { //if ideaInstance evaluates to truthy
        const addedIdea = addToDatabase('ideas', ideaInstance); //add ideaInstance to the 'allIdeas' database
        res.status(201).send(addedIdea); //send a '201 Created' response, along with the addedIdea
    } else { //otherwise
        res.status(400).send('A valid idea object requires name, description, numWeeks, and weeklyRevenue properties'); //send a '400 Bad Request' response, along with failure information
    }
});

//POST /api/meetings to create a new meeting and save it to the database
apiRouter.post('/meetings', (req, res, next) => {
    const meetingInstance = createMeeting(); //create a new 'meetingInstance'
    if(meetingInstance) { //if 'meetingInstance' evaluates to truthy
        const addedMeeting = addToDatabase('meetings', meetingInstance); //add 'meetingInstance' to the 'allMeetings' database
        res.status(201).send(addedMeeting); //send a '201 Created' response, along with the addedMeeting
    } else { //otherwise
        res.status(400).send('A valid meeting object requires id, time, date, day, and note properties'); //send a '400 Bad Request' response, along with failure information
    }
});


//GET /api/minions/:minionId to get a single minion by id
apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId; //set 'minionId' equal to the ':minionId' path argument
    const minion = getFromDatabaseById('minions', minionId); //set 'minion' equal to the minion in the 'allMinions' database
    if(minion) { //if 'minion' evaluates to truthy
        res.status(200).send(minion); //send a '200 OK' response, along with the 'minion'
    } else { //otherwise
        res.status(404).send(`Minion with id ${minionId} does not exist in the database.`); //send a '404 Not Found' response, along with failure information
    }
});

//GET /api/ideas/:ideaId to get a single idea by id
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId; //set 'ideaId' equal to the ':ideaId' path argument
    const idea = getFromDatabaseById('ideas', ideaId); //set 'idea' equal to the idea in the 'allIdeas' database
    if(idea) { //if 'idea' evaluates to truthy
        res.status(200).send(idea); //send a '200 OK' response, along with the idea
    } else { //otherwise
        res.status(404).send(`Idea with id ${ideaId} does not exist in the database.`); //send a '404 Not Found' response, along with failure information
    }
});

//PUT /api/minions/:minionId to update a single minion by id
apiRouter.put('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId; //set 'minionId' equal to the ':minionId' path argument
    const { name, title, salary, weaknesses } = req.body; //set 'name', 'title', 'salary', and 'weaknesses' variables equal to those passed in the request body
    const updatedMinion = { //create an 'updatedMinion' object
        id: minionId,
        name: name,
        title: title,
        salary: salary,
        weaknesses: weaknesses
    };
    const newMinion = updateInstanceInDatabase('minions', updatedMinion); //try to update the relevant minion in the 'allMinions' database and store the result in 'newMinion'
    if(newMinion) { //if 'newMinion' evaluates to truthy
        res.status(201).send(newMinion); //send a '201 Created' response, along with the 'newMinion'
    } else { //otherwise
        res.status(404).send(`Minion with id ${minionId} does not exist in the database.`); //send a '404 Not Found' response, along with failure information
    }
});

//PUT /api/ideas/:ideaId to update a single idea by id
apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId; //set 'ideaId' equal to the ':ideaId' path argument
    const { name, description, numWeeks, weeklyRevenue } = req.body; //set 'name', 'description', 'numWeeks', and 'weeklyRevenue' variables equal to those passed in the request body
    const updatedIdea = { //create an 'updatedIdea' object
        id: ideaId,
        name: name,
        description: description,
        numWeeks: numWeeks,
        weeklyRevenue: weeklyRevenue
    };
    const newIdea = updateInstanceInDatabase('ideas', updatedIdea); //try to update the relevant idea in the 'allIdeas' database, and store the result in 'newIdea'
    if(newIdea) { //if 'newIdea' evaluates to truthy
        res.status(201).send(newIdea); //send a '201 Created' response, along with the 'newIdea'
    } else { //otherwise
        res.status(404).send(`Idea with id ${ideaId} does not exist in the database.`); //send a '404 Not Found' response, along with failure information
    }
});

//DELETE /api/minions/:minionId to delete a single minion by id
apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const minionId = req.params.minionId; //set 'minionId' equal to the ':minionId' path argument
    const deletionSuccess = deleteFromDatabasebyId('minions', minionId); //try to delete the relevant minion from the 'allMinions' database
    if(deletionSuccess) { //if the minion was successfully deleted
        res.status(204).send(); //send a '204 No Content' response
    } else { //otherwise
        res.status(404).send(`Unable to delete the minion with the id value of ${minionId}`); //send a '404 Not Found' response, along with failure information
    }
});

//DELETE /api/ideas/:ideaId to delete a single idea by id
apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId; //set 'ideaId' equal to the ':ideaId' path argument
    const deletionSuccess = deleteFromDatabasebyId('ideas', ideaId); //try to delete the relevant idea from the 'allIdeas' database
    if(deletionSuccess) { //if the deletion was successful
        res.status(204).send(); //send a '204 No Content' response
    } else { //otherwise
        res.status(404).send(`Unable to delete the idea with the id value of ${ideaId}`); //send a '404 Not Found' response, with failure information
    }
});

//DELETE /api/meetings to delete all meetings from the database
apiRouter.delete('/meetings', (req, res, next) => {
    const clearedSchedule = deleteAllFromDatabase('meetings'); //if successful, 'clearedSchedule' should equal an empty array
    if(clearedSchedule) { //if 'clearedSchedule' equals an empty array
        res.status(204).send(); //send a '204 No Content' success response
    } else { //otherwise
        res.status(500).send(); //send a '500 Internal Server Error' failure response
    }
});

//GET /api/minions/:minionId/work to get an array of all work for the specified minion
apiRouter.get('/minions/:minionId/work', (req, res, next) => {
    const minionId = req.params.minionId; //set a 'minionId' variable equal to the ':minionId' path argument
    const workArray = getAllFromDatabase('work'); //set a 'workArray' variable equal to the 'allWork' array in './db.js'
    const workArrayFilteredByMinionId = workArray.filter((work) => { //filter the 'workArray' to return the work tasks for the given 'minionId'
        return work.minionId === minionId;
    });
    if(workArrayFilteredByMinionId.length > 0) { //if there is at least one work object in the 'workArrayFilteredByMinionId'
        res.status(200).send(workArrayFilteredByMinionId); //send a '200 OK' response, along with the 'workArrayFilteredByMinionId'
    } else { //otherwise
        res.status(404).send(); //send a '404 Not Found' response
    }
});

//POST /api/minions/:minionId/work to create a new work object and save it to the database
apiRouter.post('/minions/:minionId/work', (req, res, next) => {
    const minionId = req.params.minionId; //set a 'minionId' variable equal to the ':minionId' path argument
    const { title, description, hours } = req.body; //set 'title', 'description', and 'hours' variables equal to the arguments passed in the request's body
    const minionArray = getAllFromDatabase('minions'); //set a 'minionArray' variable equal to the 'allMinions' array in './db.js'
    const filteredMinionArray = minionArray.filter((minion) => { //set a 'filteredMinionArray' variable equal to an array that contains all the minions whose id value matches the minionId variable
        return minion.id === minionId;
    });
    if(filteredMinionArray.length === 1) { //if a valid minion element is contained in the filteredMinionArray
        const newWorkObject = { //create a new work object with 'title', 'description', 'hours', and 'minionId' properties
            title: title,
            description: description,
            hours: hours,
            minionId: minionId
        };
        const addedWorkObject = addToDatabase('work', newWorkObject); //add newWorkObject to the 'allWork' array, and store the returned object in an 'addedWorkObject' variable
        res.status(201).send(addedWorkObject); //send a '201 Created' response, along with the addedWorkObject
    } else { //otherwise
        res.status(400).send(); //send a '400 Bad Request' response
    }
});

//PUT /api/minions/:minionId/work/:workId to update a single work by id
apiRouter.put('/minions/:minionId/work/:workId', (req, res, next) => {
    const { minionId, workId } = req.params; //set 'minionId' and 'workId' variables equal to the ':minionId' and ':workId' path arguments
    const { title, description, hours } = req.body; //set 'title', 'description', and 'hours' variables equal to those sent in the request body
    const isNumericMinionId = isNaN(Number(minionId))? false: true; //set an 'isNumericMinionId' boolean variable equal to the result of testing whether Number(minionId) is numeric
    const isNumericWorkId = isNaN(Number(workId))? false: true; //set an 'isNumericWorkId' boolean variable equal to the result of testing whether Number(workId) is numeric
    const minionArray = getAllFromDatabase('minions'); //set a 'minionArray' variable equal to the 'allMinions' array in './db.js'
    const filteredMinionArray = minionArray.filter((minion) => { //set a 'filteredMinionArray' variable equal to an array that contains all the minions whose id value matches the minionId variable
        return minion.id === minionId;
    });
    const workArray = getAllFromDatabase('work'); //set a 'workArray' variable equal to the 'allWork' array in './db.js'
    const filteredWorkArray = workArray.filter((work) => { //set a 'filteredWorkArray' variable equal to an array that contains all the work objects whose id value matches the workId variable
        return work.id === workId;
    });
    const currentWorkIdElement = getFromDatabaseById('work', workId); //return the current element in the 'allWork' array whose id value is equal to workId
    let workIdHasCorrectMinionId = false; //declare a 'workIdHasCorrectMinionId' boolean variable and set it to false
    if(currentWorkIdElement) { //if currentWorkIdElement evaluates to truthy (i.e. not undefined)
        workIdHasCorrectMinionId = currentWorkIdElement.minionId === minionId; //set 'workIdHasCorrectMinionId' to the result of testing whether the minionId property of the currentWorkIdElement is equal to the ':minionId' path argument
    }
    if(isNumericMinionId && isNumericWorkId && filteredMinionArray.length === 1 && filteredWorkArray.length === 1 && workIdHasCorrectMinionId) { //if minionId is numeric, workId is numeric, minionId is valid, workId is valid, and the minionId is correct for the workId
        const updatedInstance = { //define an updated work object that will replace the old object in the 'allWork' array
            id: workId,
            title: title,
            description: description,
            hours: hours,
            minionId: minionId
        };
        const updatedWorkObject = updateInstanceInDatabase('work', updatedInstance); //update the relevant element of the 'allWork' array, and assign the updated and returned element to 'updatedWorkObject'
        res.status(201).send(updatedWorkObject); //send a '201 Created' response, along with the updatedWorkObject
    } else if(currentWorkIdElement && !workIdHasCorrectMinionId) { //otherwise, if workId points to a valid work object whose minionId property does not match the ':minionId' path argument
        res.status(400).send(); //send a '400 Bad Request' response
    } else { //otherwise...
        res.status(404).send(); //send a '404 Not Found' response
    }
});

//DELETE /api/minions/:minionId/work/:workId
apiRouter.delete('/minions/:minionId/work/:workId', (req, res, next) => {
    const { minionId, workId } = req.params; //set 'minionId' and 'workId' variables equal to the ':minionId' and ':workId' path arguments
    const isNumericMinionId = isNaN(Number(minionId))? false: true; //set an 'isNumericMinionId' variable equal to the result of testing whether minionId is a numeric value
    const isNumericWorkId = isNaN(Number(workId))? false: true; //set an 'isNumericWorkId' variable equal to the result of testing whether workId is a numeric value
    const minion = getFromDatabaseById('minions', minionId); //set 'minion' equal to the result of searching the 'allMinions' array by minionId
    const work = getFromDatabaseById('work', workId); //set 'work' equal to the result of searching the 'allWork' array by workId
    if(isNumericMinionId && isNumericWorkId && minion && work) { //if minionId and workId are numeric, and a valid minion and work element have been returned from their respective arrays
        deleteFromDatabasebyId('work', workId); //delete the work object (whose id value matches workId) from the 'allWork' array
        res.status(204).send(); //send a '204 No Content' response
    } else {
        res.status(404).send(); //send a '404 Not Found' response
    }
});


module.exports = apiRouter;
