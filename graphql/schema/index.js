const {buildSchema} = require ('graphql');

module.exports = buildSchema(`
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
`);