const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find({})
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, { $set: req.body}, { reuValidators: true, new: true }
      )
      .then((user) =>
      !user
      ? res.status(404).json({ message: 'No user found with this ID' })
      : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
},
  // Delete a user and the thought
  deleteUser(req, res) {
    Student.findOneAndRemove({ _id: req.params.userId })
      .then((User) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.removeMany(
              { _id: { $in: user.thoughts }},
            )
      )
      .then(() => res.json({ messega: 'User and the Thought deleted!'}))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
      // Create a friend
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true }
    )
      .then((user) =>
          !user
            ? res.status(404).json({ message: "No User found with this ID!" })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

























//   // Add a friend
//   addFriend(req, res) {
//     User.findOneAndUpdate(
//       { _id: req.params.friendId },
//       { $addToSet: { assignments: req.body } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//               .status(404)
//               .json({ message: 'No student found with that ID :(' })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Remove assignment from a student
//   removeAssignment(req, res) {
//     Student.findOneAndUpdate(
//       { _id: req.params.studentId },
//       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//               .status(404)
//               .json({ message: 'No student found with that ID :(' })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };
