const Task = require("../models/Task");

const TaskResolvers = {
  Query: {
    getTasks: async () => {
      return Task.findAll();
    },
  },
  Mutation: {
    createTask: async (_, { task }) => {
      return Task.create(task);
    },

    updateTask: async (_, { id, task }) => {
      const existingTask = await Task.findByPk(id);

      if (!existingTask) {
        throw new Error(`Task with ID ${id} not found`);
      }

      await existingTask.update(task);
      return existingTask;
    },

    deleteTask: async (_, { id }) => {
      const result = await Task.destroy({
        where: {
          id,
        },
      });

      return result > 0;
    },
  },
};

module.exports = TaskResolvers;
