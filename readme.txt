This file basicalls contains the flow of the project for better understanding.

CONTACT-MANAGEMENT:
  { Contacts creates with all api endpoints req > mongodb setup & connection and contact db & user db schema >
 > Authentication Login,register,current user info of USER > Integrated JWT(Jsonwebtoken) > Integrated contacts with a user who try to fetch contact detail with making them private routes }

=>Firstly we installed npm,nodemon ,express,and all other libraries we need in this project.
=>then we created server.js  where we established the express server and declare the api routes of user and contacts.
=> We made constants.js and errorHandlletr.js for hadling different types of error we r going to associate with.
=> Then we create the router of the project in userRoutes.js which includes all contact routes i.e get all contacts,create,delete,update.
=> Then we created contactController.js file in controller folder  to state the logic behind all the routes.
=> Then with the help of thunderclient extension we check our api call through new request.
=> Then we did the mongodb setup on its official website and made connection it with our node with the help of mongoose.
=> Then we created the schema of our contacts db in contactMedal.js
=> After testing the backend of contacts though thunderclient ...we goes on to User Authentication . Everything will be same in the process.
=> We created the routes of User i.e login,register,current in userRoutes.js with their all logics in userController.js and its schema in contactModel.js
=> After testing the logic of routes ..we created the jwt & accesstoken to validate the user login info and current info 
=> In validateTokenHandller.js we check the if the accessToken is correct or not.