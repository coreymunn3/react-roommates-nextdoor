# react-roommates-nextdoor

[Brainstorming doc](https://docs.google.com/document/d/1K3vOfS0cWp-fCUPLk7bPFyV6mG-FZxe4IdsRv_nAPJA/edit?usp=sharing)

## How to run the development servers
cd into server/ from root in your terminal and execute "npm run dev". This will run the react frontend server and backend api concurrently, with requests from react being proxied to localhost:5000 (dev server). because I'm using a package called "concurrently" you don't need to start up the react server manually by doing npm start.

## API Documentation:

### Auth Routes
* POST /auth/signup
   * Requires: request body must contain username, password, city, and state (email is optional but encouraged)
   * Success Result: 
   ```
   {
    loggedIn: true,
    user: {
      _id: [mongodb-generated unique ID],
      username: [username from request],
      password: [hashed password],
      email: [email from request],
      _location: [mondb-generated ID from request linking to location collection]
    }
   }
   ```
   * Error Meanings/Causes: 
     - "Missing Required Information - username, password, city, or state": You have failed to pass required data in the request body.
     - "User Already Exists": Can't sign up because this username is already being used in the database. Correct action - link to forgot password or Login
     - "Location Unsupported": Location does not exist in our database, so user cannot register using that location.
     - "Location Not Found": Server error where MongoDb was unable to find the location for some reason.
     - "Username Not Found": Server error where MongoDb was unable to find username
   
* POST /auth/login
   * Requires: request body must contain username and password.
   * Success Result:
   ```
   {
    loggedIn: true,
    user: {
      _id: [mongodb-generated unique ID],
      username: [username from request],
      password: [hashed password],
      email: [email from request],
      _location: [mondb-generated ID from request linking to location collection]
    }
   }
   ```
   * Error Meanings/Causes:
     - "Missing Required Information - username or password": You have failed to pass required data in the request body.
     - "User Does Not Exist": No user by that username exists. Correct Action - link to signup page
   
* GET /auth/logout
   * Requires: Logged In User
   * Success Result:
   ```
   {
    loggedIn: false,
    message: 'Logout Successful'
   }
   ```
   * Error Meanings/Causes:
     - "No User Logged In": Attempting to log out when no user is logged in.
   
* GET /auth/currentuser
   * Requires: Nothing
   * Success Result:
   ```
   {
    loggedIn: true,
    user: {
      _id: [mongodb-generated unique ID],
      username: [username from request],
      password: [hashed password],
      email: [email from request],
      _location: [mondb-generated ID from request linking to location collection]
    }
   }
   ```
   * Fail Result: No User Logged In
   ```
   {
    loggedIn: false,
    user: {}
   }
   ```
   * Error Meanings/Causes: None


## Wireframes 

Design and UI for web app

Login UI             |  User Profile / Settings UI
:-------------------------:|:-------------------------:
![](https://i.imgur.com/LHZl3QB.png)  |  ![](https://i.imgur.com/be3M0uO.png)
| ![](https://i.imgur.com/amQgdWh.png) 

Post Feed (Web View)
![](https://imgur.com/ovRuLZM.png)

Post Feed (Mobile)
![](https://imgur.com/vnJLdFt.png)

Post Feed with Open Item
![](https://imgur.com/Ht1M3ER.png)
