const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users GET all and POST 
router.route('/').get(getUser).post(createUser);

// /api/users/:userId GET one user, PUT and DELETE by user's ID
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId POST and DELETE a friend by ID
router.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);

module.exports = router;











// const router = require('express').Router();
// const {
//   getStudents,
//   getSingleStudent,
//   createStudent,
//   deleteStudent,
//   addAssignment,
//   removeAssignment,
// } = require('../../controllers/studentController');

// // /api/students
// router.route('/').get(getStudents).post(createStudent);

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

// module.exports = router;
