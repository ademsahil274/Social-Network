const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts GET all and POST thought
router.route('/').get(getThought).post(createThought);

// /api/thoughts/:thoughtId GET one thought, PUT and DELETE by iD
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions POST new reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;



// const router = require('express').Router();
// const {
//   getCourses,
//   getSingleCourse,
//   createCourse,
//   updateCourse,
//   deleteCourse,
// } = require('../../controllers/courseController.js');

// // /api/thoughts
// router.route('/').get(getCourses).post(createCourse);

// // /api/thoughts/:thoughtId
// router
//   .route('/:courseId')
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

// module.exports = router;
