# Bootcamp Connect
The purpose of this site is to provide a resource to Coding Bootcamp graduates to stay connected and support each other. The site includes a primary directory page of all members of a cohort, ability to view detailed profiles of users, and send messages to a cohort message board to share any helpful information. 

## Getting Started
To get started, a user must register an account with username (email address), password, and cohortId. An admin must have already created a cohortId to share with the particular bootcamp class.

Once the user is registered, the user can then update his/her profile with desired information to be displayed. 

Users also have the ability to post to the message board. 


## API Routes Documentation
DB is built with Mongo. All data is stored and returned as json documents.

### Registration/Login Routes
- POST /api/users/registration
   - req.body: {
       username,
       password,
       cohortId
   }
   - stores username, hashed password, salt, and cohortId in User collection
   - Username is required to be email address
   - responds with newly created user item

- POST /api/users/session
    - req.body: {
        username,
        password
    }
    - Posts the username/password for login.
    - Username is required to be email address
    - The password is haded to encrypt along with the 'salt', which provided additional security. Salt is autogenerated by the service.
    - responds with the userId, auth token, and cohortId to be stored locally and used in future posts.
    - The auth token is required for all future calls to the server/DB. Some routes to the server also require userId and/or cohortId. 


### Profile Routes
- POST /api/profiles
    - req.body: {
        firstName,
        lastName,
        email,
        phoneNumber,
        image,
        description,
        links,
        employmentStatus,
        skills,
        cohortId,
        location
    }
    - Posts a new profile for a user. No elements are required for the API call, but will be required on frontend.
    - email is linked to the UserId and pulled from user document
    - Responds with json of the new profile data, including email address from the user document


- PUT /api/profiles/:userId
    - req.body: {
        firstName,
        lastName,
        email,
        phoneNumber,
        image,
        description,
        links,
        employmentStatus,
        skills,
        cohortId,
        location
    }
    - Updates an existing profile for a user with data included in the req.body. userId stored in local storage must be included in the URL parameter.
    - Responds with the updated profile json.


- GET /api/profiles
    - Responds with full list of profiles & profile data on the DB in json format.

- GET /api/profiles/:cohortId
    - Responds with a all profiles & profile data for a single cohort. Determined by the cohortId in the URL parameter. 


### Message Board 'posts' routes
- GET /api/posts/
    - Responds with all 'posts' and posts data on the DB in json format.

- GET /api/posts/:cohortId
    - Responds with all posts and posts data for a single cohort. Determined by the cohortId in the URL parameter

- POST /api/posts
    - req.body {
        title (required),
        body,
        timePosted (auto generated by schema in UTC format),
        location,
        cohortId,
        tags,
        category (Required. limited list available)
    }
    - Posts a new 'post' to the DB.
    - Responds with the new post json if successful
