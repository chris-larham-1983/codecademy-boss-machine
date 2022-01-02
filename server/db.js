const faker = require('faker'); //require the package that allows you to generate massive amounts of fake data in the browser and node.js

let minionIdCounter = 1; //set a 'minionIdCounter' variable equal to 1

const createMinion = () => { //function to create a minion object
  const weaknesses = new Array(3).fill(0).map(() => { //create a three-element 'weaknesses' array
    const reasons = ['Cannot do', 'Unable to execute', 'Will not build']; //create an array of 'reasons'
    const reason = reasons[Math.floor(Math.random() * reasons.length)]; //choose a random 'reason'
    const adj = faker.company.bsAdjective(); //set an 'adj' variable equal to a random bs company adjective
    const noun = faker.company.catchPhraseNoun(); //set a 'noun' variable equal to a random bs company catch phrase noun
    return `${reason} ${adj} ${noun}`; //return "reason adjective noun" -- e.g. "Cannot do granular complexity"
  })
  .join(', ') + ', too ' + faker.hacker.adjective(); //join the returned string with ", too " plus a random adjective ... so that 'weaknesses'
                                                     // is equal to a string looks something like "Cannot do granular complexity, too wireless"
  return { //return a 'minion' object
    id: `${minionIdCounter++}`, //whose 'id' property is equal to a string representation of minionIdCounter plus one
    name: faker.name.findName(), //whose 'name' property is equal to a random name
    title: faker.name.jobTitle(), //whose 'jobTitle' property is equal to a random job title
    weaknesses: weaknesses, //whose 'weaknesses' property is equal to the 'weaknesses' array created above
    salary: 40000, //and whose 'salary' is equal to 40000
  }
}

let workIdCounter = 1; //set a 'workIdCounter' variable equal to 1

const createWork = (minionId) => { //function that creates work based on a minionId argument
  return { //returns a work object
    id: `${workIdCounter++}`, //whose 'id' property is equal to a string representation of workIdCounter plus one
    title: `Close deal #${Math.floor(Math.random() * 4) + 3}`, //whose 'title' property is equal to "Close deal #[3-6]"
    description: 'Close the biggest deal!', //whose 'description' property is equal to "Close the biggest deal!"
    hours: Math.floor(Math.random() * 8) + 1, //whose 'hours' property is equal to 1-8
    minionId: `${minionId}`, //and whose 'minionId' property is equal to a string representation of the minionId argument
  }
}

let ideaIdCounter = 1; //set an 'ideaIdCounter' variable to 1
const companies = [ //define an array of companies
  'Codecademy',
  'Uber',
  'Snapchat',
  'Facebook',
  'Microservices',
  'Pets.com',
];

const createIdea = () => { //function that creates an idea
  const noun = faker.company.bsNoun(); //set a 'noun' variable equal to a random noun (e.g. models)
  const name = companies[Math.floor(Math.random() * companies.length)]; //set a 'name' variable equal to a random element of the 'companies' array (e.g. Codecademy)
  let weeklyRevenue = 0; //set a 'weeklyRevenue' variable equal to 0
  let numWeeks = 0; //set a 'numWeeks' variable equal to 0
  while (weeklyRevenue * numWeeks < 1000000) { //for as long as 'weeklyRevenue' multiplied by 'numWeeks' is less than 1000000
    weeklyRevenue = Math.floor(Math.random() * 123562); //set 'weeklyRevenue' equal to a number in the range 0 - 123561
    numWeeks = Math.floor(Math.random() * 104) + 6; //set 'numWeeks' equal to a number in the range 6 - 109
  }

  return { //return an idea object
    id: `${ideaIdCounter++}`, //whose 'id' property is equal to the string representation of ideaIdCounter plus 1
    name: `${name} but for ${noun}`, //whose 'name' property is equal to "[name] but for [noun]" - e.g. "Codecademy but for models"
    description: 'The name says it all!!!', //whose 'description' property is equal to "The name says it all!!!"
    weeklyRevenue: weeklyRevenue, //whose 'weeklyRevenue' property is equal to the weeklyRevenue variable defined above
    numWeeks: numWeeks, //and whose 'numWeeks' property is equal to the numWeeks variable defined above
  }
}

let meetingIdCounter = 1; //set a 'meetingIdCounter' variable equal to 1

const createMeeting = () => { //function that creates a meeting
  const options = [`Discussion about`, `Meeting for`, `Brainstorm`]; //define an 'options' array that contains meeting prefixes
  const option = options[Math.floor(Math.random() * options.length)]; //set an 'option' variable equal to a random element of the options array (e.g. "Brainstorm")
  const date = new Date(faker.date.future()); //set a 'data' variable equal to a random date in the future
  return { //return a meeting object
    id: `${meetingIdCounter++}`, //whose 'id' property is equal to the string representation of meetingIdCounter plus one
    time: date.toTimeString().slice(0, 5), //whose 'time' property is equal to the first five characters in date.toTimeString() - e.g. 09:56
    date: date, //whose 'date' property is equal to the date variable
    day: date.toDateString(), //whose 'day' property is equal to date.toDateString() - e.g. Sun Dec 26 2021
    note: `${option} ${faker.company.catchPhrase()}`, //and whose 'note' property is equal to the option variable plus a random company catchphrase - e.g. "Brainstorm Team-oriented context-sensitive conglomeration"
  }
}

const allMinions = new Array(10).fill(0).map(createMinion); //define an array of 10 minions
const allIdeas = new Array(10).fill(0).map(createIdea); //define an array of 10 ideas
const allWork = allMinions.map(minion => createWork(minion.id)); //define an array of 10 work tasks
const allMeetings = new Array(3).fill(0).map(createMeeting); //define an array of 3 meetings

const isValidMinion = (instance) => { //function that validates a minion object instance
  instance.name = instance.name || ''; //set the minion object's name equal to its current name value OR an empty string if no name was specified
  instance.weaknesses = instance.weaknesses || ''; //set the minion object's weaknesses equal to its current weaknesses value OR an empty string if no weaknesses were specified
  instance.title = instance.title || ''; //set the minion object's title equal to its current title value OR an empty string if no title was specified
  if (typeof instance.name !== 'string' || typeof instance.weaknesses !== 'string'
  || typeof instance.title !== 'string') { //if any of the 'name', 'weaknesses', or 'title' values are not typeof string
    throw new Error('Minion\'s name, title, and weaknesses must be strings'); //throw a new Error
  }
  if (!isNaN(parseFloat(instance.salary)) && isFinite(instance.salary)) { //if the parsed 'salary' value of the minion object is a Number and finite
    instance.salary = Number(instance.salary); //set the salary of the minion object to the numerical representation of its current salary value
  } else { //otherwise
    throw new Error('Minion\'s salary must be a number.'); //throw a new Error
  }
  return true; //return true if the minion object is valid
}

const isValidIdea = (instance) => { //function that validates an idea object instance
  instance.name = instance.name || ''; //set the idea object's name equal to its current name value OR an empty string
  instance.description = instance.description || ''; //set the idea object's description equal to its current description value OR an empty string
  if (typeof instance.name !== 'string' || typeof instance.description !== 'string') { //if the idea object's name or description values are not typeof string
    throw new Error('Idea\'s name and description must be strings'); //throw a new Error
  }
  if (!isNaN(parseFloat(instance.numWeeks)) && isFinite(instance.numWeeks)) { //if the parsed idea object's 'numWeeks' value is a number and finite
    instance.numWeeks = Number(instance.numWeeks); //set the idea object's 'numWeeks' property equal to the numerical representation of its current numWeeks value
  } else { //otherwise
    throw new Error('Idea\'s numWeeks must be a number.'); //throw a new Error
  }
  if (!isNaN(parseFloat(instance.weeklyRevenue)) && isFinite(instance.weeklyRevenue)) { //if the parsed 'weeklyRevenue' value of the idea object is a number and finite
    instance.weeklyRevenue = Number(instance.weeklyRevenue); //set the 'weeklyRevenue' property of the idea object equal to the numerical representation of its current weeklyRevenue value
  } else { //otherwise
    throw new Error('Idea\'s weeklyRevenue must be a number.'); //throw a new Error
  }
  return true; //return true if the idea object is valid
}

const isValidWork = (instance) => { //function that validates a work object instance
  instance.title = instance.title || ''; //set the work object's 'title' property equal to its current title value OR an empty string
  instance.description = instance.description || ''; //set the work object's 'description' property equal to its current description OR an empty string
  if (typeof instance.title !== 'string' || typeof instance.description !== 'string') { //if the work object's 'title' or 'description' values are not typeof string
    throw new Error('Work\'s title and description must be strings'); //throw a new Error
  }
  if (!isNaN(parseFloat(instance.hours)) && isFinite(instance.hours)) { //if the parsed 'hours' value of the work object is a number and finite
    instance.hours = Number(instance.hours); //set the 'hours' property of the work object equal to the numerical representation of its current hours value
  } else { //otherwise
    throw new Error('Work\'s hours must be a number.'); //throw a new Error
  }
  let isValidMinionId = db.allMinions.data.find((minion) => { //set an 'isValidMinionId' variable equal to
    return minion.id === instance.minionId; //the minion in the 'allMinions' array whose id value is equal to the minionId of the work object
  });
  if (!isValidMinionId) { //if the 'isValidMinionId' variable evaluates to false
    throw new Error('Work must have a valid minionId that actually exists in the database'); //throw a new Error
  }
  return true; //return true if the work object is valid
}

const isValidMeeting = (instance) => { //function that validates a meeting object instance
  if (typeof instance.time !== 'string' || instance.time.length < 4) { //if the 'time' property of the meeting object is not typeof string OR the length of the 'time' value is less than 4
    throw new Error('Meeting time must be valid!'); //throw a new Error
  }
  if (!instance.date instanceof Date) { //if the 'date' property of the meeting object is not typeof Date
    throw new Error('Meeting date must be a JS Date object'); //throw a new Error
  }
  if (!instance.day || typeof instance.day !== 'string') { //if there is no 'day' property in the current object OR the type of the day property is not string
    throw new Error('Meeting must have a day property'); //throw a new Error
  }
  if (!instance.note || typeof instance.note !== 'string') { //if there is no 'note' property in the meeting object OR the note property is not typeof string
    throw new Error('Meeting must have a valid note property'); //throw a new Error
  }
  return true; //return true if the meeting object is valid
}

const db = { //set the variable 'db' equal to an object...
  allMinions: { //...whose 'allMinions' property is equal to an object with three properties
    data: allMinions, //'data' is equal to the allMinions array
    nextId: minionIdCounter, //'nextId' is equal to minionIdCounter
    isValid: isValidMinion, //and 'isValid' is equal to the isValidMinion validation function
  },
  allIdeas: { //...whose 'allIdeas' property is equal to an object with three properties
    data: allIdeas, //'data' is equal to the allIdeas array
    nextId: ideaIdCounter, //'nextId' is equal to ideaIdCounter
    isValid: isValidIdea, //and 'isValid' is equal to the isValidIdea validation function
  },
  allWork: { //...whose 'allWork' property is equal to an object with three properties
    data: allWork, //'data' is equal to the allWork array
    nextId: workIdCounter, //'nextId' is equal to the workIdCounter
    isValid: isValidWork, //and 'isValid' is equal to the isValidWork validation function
  },
  allMeetings: { //...and whose 'allMeetings' property is equal to an object with three properties
    data: allMeetings, //'data' is equal to the allMeetings array
    nextId: meetingIdCounter, //'nextId' is equal to the meetingIdCounter
    isValid: isValidMeeting, //and 'isValid' is equal to the isValidMeeting validation function
  }
}


const findDataArrayByName = (name) => { //'findDataArrayByName' is a function that returns a particular data object based on the 'name' argument
  switch (name) {
    case 'minions': //if name equals 'minions'
      return db.allMinions; //return the 'allMinions' object that is nested inside the 'db' object
    case 'ideas': //if name equals 'ideas'
      return db.allIdeas; //return the 'allIdeas' object that is nested inside the 'db' object
    case 'work': //if name equals 'work'
      return db.allWork; //return the 'allWork' object that is nested inside the 'db' object
    case 'meetings': //if name equals 'meetings'
      return db.allMeetings; //return the 'allMeetings' object that is nested inside the 'db' object
    default: //if name is none of 'minions', 'ideas', 'work', and 'meetings'
      return null; //return null
  }
}

const getAllFromDatabase = (modelType) => { //'getAllFromDatabase' is a function that returns either an array OR null, depending on the modelType argument
  const model = findDataArrayByName(modelType); //'model' will equal one of db.allMinions, db.allIdeas, db.allWork, db.allMeetings, or null, depending on the modelType argument
  if (model === null) { //if model is equal to null
    return null; //return null
  }
  return model.data; //return the array associated with the 'data' property of the model object
}

const getFromDatabaseById = (modelType, id) => { //'getFromDatabaseById' is a function that will return an element of an array OR null, depending on the modelType argument
  const model = findDataArrayByName(modelType); //'model' will equal one of db.allMinions, db.allIdeas, db.allWork, db.allMeetings, or null, depending on the modelType argument
  if (model === null) { //if model is equal to null
    return null; //return null
  }
  return model.data.find((element) => { //return the first element of the array pointed to by model.data for which
    return element.id === id; //the element's id is equal to the id argument
  });
}

const addToDatabase = (modelType, instance) => { //'addToDatabase' is a function that either adds an element to the database and returns that element OR returns null
  const model = findDataArrayByName(modelType); //'model' will equal one of db.allMinions, db.allIdeas, db.allWork, db.allMeetings, or null, depending on the modelType argument
  if (model === null) { //if model is equal to null
    return null; //return null
  }
  if (model.isValid(instance)) { //if the instance object passes the validation process
    instance.id = `${model.nextId++}`; //set the 'id' property of the instance object to the string representation of the current value of the model object's nextId property, and increment the nextId value
    model.data.push(instance); //add the object instance to the array pointed to by model.data
    return model.data[model.data.length - 1]; //return the added object instance
  }
}

const updateInstanceInDatabase = (modelType, instance) => { //'updateInstanceInDatabase' is a function that either updates an element in the database and returns that element, OR returns null
  const model = findDataArrayByName(modelType); //'model' will equal one of db.allMinions, db.allIdeas, db.allWork, db.allMeetings, or null, depending on the modelType argument
  if (model === null) { //if model is equal to null
    return null; //return null
  }
  const instanceIndex = model.data.findIndex((element) => { //set 'instanceIndex' equal to the index of the array pointed to by model.data whose element's id is equal to instance's id
    return element.id === instance.id;
  });
  if (instanceIndex > -1 && model.isValid(instance)) { //if an element was found and the instance object validates successfully
    model.data[instanceIndex] = instance; //set the instanceIndex'th element of the array pointed to by model.data equal to the instance object argument
    return model.data[instanceIndex]; //return the instanceIndex'th element of the array pointed to by model.data
  } else { //otherwise
    return null; //return null
  }
}

const deleteFromDatabasebyId = (modelType, id) => { //'deleteFromDatabasebyId' is a function that will delete an element from the database given valid parameters and return true, OR return null/false
  const model = findDataArrayByName(modelType); //'model' will equal one of db.allMinions, db.allIdeas, db.allWork, db.allMeetings, or null, depending on the modelType argument
  if (model === null) { //if model is equal to null
    return null; //return null
  }
  let index = model.data.findIndex((element) => { //set an 'index' variable equal to the index of the array pointed to by model.data whose element's id is equal to the id argument
    return element.id === id;
  });
  if (index !== -1) { //if 'index' does not equal -1
    model.data.splice(index, 1); //remove the index'th element of the array pointed to by model.data
    return true; //return true
  } else { //otherwise
    return false; //return false
  }
}

const deleteAllFromDatabase = (modelType) => { //'deleteAllFromDatabase' is a function that either empties an array and returns that array, OR returns null, depending on the modelType argument
  const model = findDataArrayByName(modelType); //model will equal one of db.allMinions, db.allIdeas, db.allWork, db.allMeetings, or null, depending on the modelType argument
  if (model === null) { //if model is equal to null
    return null; //return null
  }
  model.data = []; //empty the array pointed to by model.data
  return model.data; //return the empty array
}

module.exports = { //define the functions that are exported by this module
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
};
