
const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// create the User model using the UserSchema
const User = model('User', userSchema);
// export the User model
module.exports = User;




















// const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Reaction');

// // Schema to create Student model
// const studentSchema = new Schema(
//   {
//     first: {
//       type: String,
//       required: true,
//       max_length: 50,
//     },
//     last: {
//       type: String,
//       required: true,
//       max_length: 50,
//     },
//     github: {
//       type: String,
//       required: true,
//       max_length: 50,
//     },
//     assignments: [assignmentSchema],
//   },
//   {
//     toJSON: {
//       getters: true,
//     },
//   }
// );

// const Student = model('student', studentSchema);

// module.exports = Student;
