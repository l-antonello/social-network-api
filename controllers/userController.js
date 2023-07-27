// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { user, Course } = require('../models');

// TODO: Create an aggregate function to get the number of users overall
const headCount = async () => {
  // Your code here
  const numberOfusers = await user.aggregate();
  return numberOfusers;
}

// Execute the aggregate method on the user model and calculate the overall grade by using the $avg operator
const grade = async (userId) =>
  user.aggregate([
    // TODO: Ensure we include only the user who can match the given ObjectId using the $match operator
    {
      // Your code here
    },
    {
      $unwind: '$assignments',
    },
    // TODO: Group information for the user with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      // Your code here
    },
  ]);

module.exports = {
  // Get all users
  async getusers(req, res) {
    try {
      const users = await user.find();
      const userObj = {
        users,
        headCount: await headCount(),
      };
      return res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleuser(req, res) {
    try {
      const user = await user.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean();

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        user,
        grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createuser(req, res) {
    try {
      const user = await user.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the course
  async deleteuser(req, res) {
    try {
      const user = await user.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }

      const course = await Course.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!course) {
        return res.status(404).json({
          message: 'user deleted, but no courses found',
        });
      }

      res.json({ message: 'user successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an assignment to a user
  async addAssignment(req, res) {
    try {
      console.log('You are adding an assignment');
      console.log(req.body);
      const user = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' })
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a user
  async removeAssignment(req, res) {
    try {
      const user = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
