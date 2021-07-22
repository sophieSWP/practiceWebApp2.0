//IMPORT STATEMENTS
const express = require('express');
const { graphqlHTTP }=require('express-graphql');
const { buildSchema, buildASTSchema } = require('graphql');
const mongoose = require('mongoose');

const Sensor = require('./models/sensor');

const app = express();

app.use(express.json());

//SCHEMAS -- DEFINES THE STRUCTURE
app.use(
    '/graphql',
    graphqlHTTP({
      schema: buildSchema(`
          type Sensor {
              _id:ID!
              Room: String!
              Motion: Int!
              Date: String!
              Time: String!
          }

          input SensorInput {
              Room: String!
              Motion: Int!
              Date: String!
              Time: String!
          }

          input RoomInput {
              Room: String!
          }

          input MotionInput {
            Motion: Int!
          }

          input RoomMotionInput {
            Room: String!
            Motion: Int!
        }

        input RoomDateInput {
            Room: String!
            Date: String!
        }

        input DateInput {
            Date: String!
        }

          type RootQuery {
              sensors: [Sensor!]!
              searchSensor(roomInput: RoomInput): [Sensor]
              searchMotion(motionInput: MotionInput): [Sensor]
              searchRoomMotion(roomMotionInput:RoomMotionInput): [Sensor]
              searchRoomDate(roomDateInput: RoomDateInput): [Sensor]
              searchDate(dateInput: DateInput): [Sensor]
            
          }
          type RootMutation {
              createSensor(sensorInput: SensorInput): Sensor
              

          }
          schema {
              query: RootQuery
              mutation: RootMutation
          }
      `),
      //RESOLVERS
      rootValue: { 
        sensors: () => {
          return Sensor.find()
          .then(sensors => {
              return sensors.map(sensor => {
                return {...sensor._doc, _id: sensor.id };
              });
          })
          .catch(err => {
              throw err;
          })
        },

        //DISPLAYS LIST OF SENSORS WITH MATCHING ROOM NAME
        searchSensor: async (args) => {
            const fetchedSensor = await Sensor.find({ Room: args.roomInput.Room }); 
            if (!fetchedSensor) return null;
            return fetchedSensor;
          },

          //DISPLAYS LIST OF SENSORS WITH MATCHING MOTION INPUT (INT) 
        searchMotion: async (args) => {
            const fetchedSensorMotion = await Sensor.find({ Motion: args.motionInput.Motion }); 
            if (!fetchedSensorMotion) return null;
            return fetchedSensorMotion;
          },

          //DISPLAYS LIST OF SENSORS WITH MATCHING MOTION (INT) AND ROOM (STRING) INPUT
          searchRoomMotion: async (args) => {
            const fetchedSensorRoomMotion = await Sensor.find({ Room: args.roomMotionInput.Room, Motion: args.roomMotionInput.Motion }); 
            if (!fetchedSensorRoomMotion) return null;
            return fetchedSensorRoomMotion;
          },

          //DISPLAYS LIST OF SENSORS WITH MATCHING ROOM (STRING) AND MOTION(INT) INPUT
          searchRoomDateMotion: async (args) => {
            const fetchedSensorRoomDate = await Sensor.find({ Room: args.roomDateInput.Room, Date: args.roomDateInput.Date }); 
            if (!fetchedSensorRoomDate) return null;
            return fetchedSensorRoomDate;
          },

          //DISPLAYS SENSOR DETAILS WITH MATCHING DATE (STRING) PARAMETERS
          searchDate: async (args) => {
            const fetchedSensorDate = await Sensor.find({ Motion: args.dateInput.Date }); 
            if (!fetchedSensorDate) return null;
            return fetchedSensorDate;
          },

          //CREATES DOCUMENT
        createSensor: (args) => {
        const sensor = new Sensor({
            Room: args.sensorInput.Room,
            Motion: +args.sensorInput.Motion,
            Date: new Date(args.sensorInput.Date),
            Time: args.sensorInput.Time
        });
        return sensor
        .save()
        .then(result => {
            console.log(result);
            return{...result._doc, _id: result._doc._id.toString()};
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
        }
      },
      graphiql: true
    })
  );

  //CONNECTION STRING
mongoose.connect(`mongodb+srv://dbAdmin:Sm4rtW0rk@Sensors.3q8zp.mongodb.net/office_data?retryWrites=true&w=majority`)
.then(()=> {
    app.listen(3000);
}).catch(err=> {
    console.log(err);
});

// mongoose.connect('mongodb+srv://dbAdmin:Sm4rtW0rk@sensors.3q8zp.mongodb.net/Office_Data?retryWrites=true&w=majority');
// var connection = mongoose.connection;
// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function () {
//     connection.db.collection("office_data", function(err, collection){
//         collection.find({}).toArray(function(err, data){
//             Room: "SWPRoom1",
//             Date: "2021-07-20"
//         })
//     });
// });



