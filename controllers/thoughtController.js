const { User, Thought } = require('../models');

const thoughtController = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No Thought with this ID' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate( { username: req.body.username }, { $push: { thoughts: _id }}, { new: true });
      })
      .then((dbThoughtData) => {
       if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought with this ID' })
          return;
       }
       res.json(dbThoughtData)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No Thought with this ID' })
          : User.deleteMany({ _id: { $in: dbThoughtData.users } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No Thought with this ID!' })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add Reaction
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body }},
      { runValidators: true, new: true },
    )
    .then((dbThoughtData) => 
      !dbThoughtData
        ? res.status(404).json({ message: 'No Thought found with this ID' })
        : res.json(dbThoughtData)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Delete Reaction by ID
  deleteReaction({params}, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }, { pull: { reactions: { reactionId: req.oarams.reactionId }}}, { runValidators: true, new: ture} )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No Thought found with this ID' })
          : User.deleteMany({ _id: { $in: dbThoughtData.users } })
    )
  }
};

module.exports = thoughtController;