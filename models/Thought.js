// Require Mongoos and Moment
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Reaction Schema
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// Thought Schema
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)


// Get total count of friends
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', thoughtSchema);
// Export the Thought model
module.exports = Thought;
























// const { Schema, model } = require('mongoose');

// // Schema to create a course model
// const courseSchema = new Schema(
//   {
//     courseName: {
//       type: String,
//       required: true,
//     },
//     inPerson: {
//       type: Boolean,
//       default: true,
//     },
//     startDate: {
//       type: Date,
//       default: Date.now(),
//     },
//     endDate: {
//       type: Date,
//       // Sets a default value of 12 weeks from now
//       default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
//     },
//     students: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Student',
//       },
//     ],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// const Course = model('course', courseSchema);

// module.exports = Course;
