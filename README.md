# Boss Machine

## Table of Contents

* [Project Overview](#project-overview)
* [Technologies](#technologies)
* [Unit Testing Screenshots](#unit-testing-screenshots)
* [Using the Boss Machine](#using-the-boss-machine)

## Project Overview

This is my solution to the **Codecademy Challenge Project** entitled *Boss Machine*. I had to create an entire 
API to serve information to a 'Boss Machine', a unique management application for today's most accomplished (evil) 
entrepreneurs. I had to create routes to manage my 'minions', my brilliant 'million dollar ideas' (!), and to handle 
all the annoying meetings that keep getting added to my busy schedule.

In **server.js**, I had to add code to:

- Set up body-parsing middleware with the `body-parser` package.
- Set up CORS middleware with the `cors` package.
- Mount the existing `apiRouter` at `/api`. This router serves as the starting point for all API routes.
- Start the server listening on the provided `PORT`.

In **apiRouter.js** I had to add code the following routes:

- `/api/minions`
  - `GET /api/minions` to get an array of all minions.
  - `POST /api/minions` to create a new minion and save it to the database.
  - `GET /api/minions/:minionId` to get a single minion by id.
  - `PUT /api/minions/:minionId` to update a single minion by id.
  - `DELETE /api/minions/:minionId` to delete a single minion by id.
- `/api/ideas`
  - `GET /api/ideas` to get an array of all ideas.
  - `POST /api/ideas` to create a new idea and save it to the database.
  - `GET /api/ideas/:ideaId` to get a single idea by id.
  - `PUT /api/ideas/:ideaId` to update a single idea by id.
  - `DELETE /api/ideas/:ideaId` to delete a single idea by id.
- `/api/meetings`
  - `GET /api/meetings` to get an array of all meetings.
  - `POST /api/meetings` to create a new meeting and save it to the database.
  - `DELETE /api/meetings` to delete _all_ meetings from the database.

- [x] To complete the bonus challenge, I implemented routes to allow bosses to add and remove work from their minions' backlogs. 
The routes required for this bonus challenge were:

- `GET /api/minions/:minionId/work` to get an array of all work for the specified minion.
- `POST /api/minions/:minionId/work` to create a new work object and save it to the database.
- `PUT /api/minions/:minionId/work/:workId` to update a single work by id.
- `DELETE /api/minions/:minionId/work/:workId` to delete a single work by id.

- [x] I created a custom middleware function `checkMillionDollarIdea` that is used in some `/api/ideas` routes. 
      This function is in the **server/checkMillionDollarIdea.js** file. `checkMillionDollarIdea` ensures that any new 
      or updated ideas are still worth at least one million dollars! The total value of an idea is the product of its 
      `numWeeks` and `weeklyRevenue` properties.

***
## Technologies

I implemented the API server functionality for this project using:

- *JavaScript*
- *Node JS*
- *Express.js*

I also made extensive comments in `server/db.js`, `server/apiRouter.js`, and `server/checkMillionDollarIdea.js` to document 
the logic contained within those three files.

***
## Unit Testing Screenshots

![Unit Test Screenshot 1][unit_test_screenshot_1]

[unit_test_screenshot_1]: images/Unit%20Test%20Screenshot%201.PNG

![Unit Test Screenshot 2][unit_test_screenshot_2]

[unit_test_screenshot_2]: images/Unit%20Test%20Screenshot%202.PNG

![Unit Test Screenshot 3][unit_test_screenshot_3]

[unit_test_screenshot_3]: images/Unit%20Test%20Screenshot%203.PNG

![Unit Test Screenshot 4][unit_test_screenshot_4]

[unit_test_screenshot_4]: images/Unit%20Test%20Screenshot%204.PNG

***
## Using the Boss Machine

Clone this project, open the root project directory in your terminal, and run `npm install` to install the dependencies 
of this project and build the front-end application. Once it has finished installing, you can run `npm run start` to begin 
the server. You'll see `Server listening on port 4001` in the terminal. 

To see the front-end application, simply open **index.html** in a web browser. 

To run the unit tests, run `npm run test` from the root project directory in your terminal.