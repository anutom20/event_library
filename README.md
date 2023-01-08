# event_library

Steps to test:

--> Clone the repo

--> clear app.log file

--> run "npm i"

--> create .env file and paste mongodb string here

--> run the command "npm test"

Schema

eventSchema {
eventName : String ,
callback : String,
timestamps : true

}

triggerSchema{

eventName : String,
timestamp : true

}


Description

--> Element class is created where on , trigger and off are implemented so that we can create an object of Element class , suppose ele1 and attach callbacks to this 
element

--> personal mongodb is set up

--> test.js file is created to test which runs on "npm test" command
