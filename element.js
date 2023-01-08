/* element class to create a new element 
   object so that we can attach events on it */

import eventModel from "./models/event.js";  
import triggerModel from "./models/triggers.js"; 

export default class Element {
  // Register an event handler
  async on(eventName, callback) {
    try {
      await eventModel.create({ eventName, callback });
      console.log("event registered!");
    } catch (error) {
      console.log(error.message);
    }
  }

  // Trigger all callbacks associated
  // with a given eventName
  async trigger(eventName) {
    try {
      // query the mongoDB for all documents with the given eventName

      const registeredEvents = await eventModel.find({ eventName });

      if (registeredEvents.length == 0) {
        console.log(`No event registred with name ${eventName}`);
        return;
      }

      registeredEvents.forEach((event) => {
        const callbackString = event.callback;
        const callbackFunction = eval(callbackString);
        callbackFunction();
      });

      // log trigger in mongodb

      await triggerModel.create({ eventName });
      console.log(`successfully logged ${eventName} event!`);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Remove all event handlers associated
  // with the given eventName
  async off(eventName) {
    try {
      // first check if there exists event with name "eventName"

      const eventList = await eventModel.find({eventName})

      if(eventList.length == 0){
        console.log(`no event found with name = ${eventName}`)
        return
      }
      await eventModel.deleteMany({eventName});
      console.log("event successfully removed");

      // log into mongodb
      await triggerModel.create({ eventName: `${eventName} (off)` });
      console.log(`successfully logged ${eventName} (off) event!`)
    } catch (error) {
      console.log(error.message);
    }
  }
}
