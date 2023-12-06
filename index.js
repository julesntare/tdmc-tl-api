const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const TaskTypeDefs = require("./schemas/taskSchema");
const TaskResolvers = require("./resolvers/taskResolvers");

const app = express();

app.use(cors());

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

dotenv.config();

const server = new ApolloServer({
  typeDefs: [TaskTypeDefs],
  resolvers: [TaskResolvers],
  csrfPrevention: true,
  cache: "bounded",
  context: ({ req }) => {
    const auth = authenticate(req);
    return {
      auth,
      req,
    };
  },
  introspection: true,
  playground: true,
});

const PORT = process.env.PORT || 4000;

server
  .start()
  .then(() => {
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
