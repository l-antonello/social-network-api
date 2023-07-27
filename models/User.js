const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Schema to create user model
const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    github: {
      type: String,
      required: true,
      max_length: 50,
    },
    assignments: [assignmentSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const user = model('user', userSchema);

module.exports = user;
