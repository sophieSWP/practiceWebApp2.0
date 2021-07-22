const Sensor = require('../../models/sensor');

module.exports = {
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
    };


