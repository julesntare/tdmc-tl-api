const { gql } = require("apollo-server-express");

const TaskTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    latitude: Float
    longitude: Float
  }

  input TaskInput {
    title: String!
    description: String
    latitude: Float
    longitude: Float
  }

  type Query {
    getTasks: [Task]
  }

  type Mutation {
    createTask(task: TaskInput): Task
    updateTask(id: ID!, task: TaskInput): Task
    deleteTask(id: ID!): Boolean
  }
`;

module.exports = TaskTypeDefs;
