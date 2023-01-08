import Element from "./element.js";
import connectDB from "./connect.js";
import eventModel from "./models/event.js";
import triggerModel from "./models/triggers.js";
import fs from "fs";

// testing the events

const testEvents = async () => {
  // create a new element
  const button = new Element();

  // register "click" event

  await button.on("click", () => {
    console.log("hey");
  });

  await button.on("click", () => {
    console.log("there");
  });

  // trigger click event

  await button.trigger("click");

  // remove all handlers related to click

  await button.off("click");

  // new element

  const ele = new Element()

  await ele.on("dance", ()=>{
     console.log('I am dancing!')
  })

  await ele.trigger('dance')

  await ele.on("move", ()=>{
    console.log('move move move')
  })

  await ele.on("move", ()=>{
    console.log("now don't move")
  })

  await ele.on("myMouseMyRight", ()=>{
    console.log("mouse has the might")
  })

  await ele.on("play", ()=>{
    console.log("let's play")
  })

  // trigger the events

  await ele.trigger("play")
  await ele.trigger("dance")
  await ele.trigger("myMouseMyRight")
  await ele.trigger("move")

  // remove move event

  await ele.off("move")

  // trigger "move" again , it will be noticed that this event no longer exists

  await ele.trigger("move")

  // for edge case

  await ele.off("move")


};

// clear DB

const clearDB = async () => {
  try {
    await eventModel.deleteMany({});
    await triggerModel.deleteMany({});
    console.log("db cleared successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

// write to app.log

const writeToFile = async () => {
  try {
    const triggers = await triggerModel.find({});

    if (triggers.length == 0) return;

    triggers.forEach((trigger) => {
      fs.writeFileSync(
        "app.log",
        `${trigger.eventName} --> ${trigger.createdAt}\n`,
        {
          encoding: "utf8",
          flag: "a+",
          mode: 0o666,
        }
      );
    });

    console.log('write to file successful!')


  } catch (error) {
    console.log(error.message);
  }
};

// first connect to DB , clear DB and then test and write to app.log

const test = async () => {
  await connectDB();
  await clearDB();
  await testEvents();
  writeToFile();
};

test();
