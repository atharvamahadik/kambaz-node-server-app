import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  title: String,
  type: {
    type: String,
    enum: ["multiple-choice", "true-false", "fill-in-blank"],
    default: "multiple-choice"
  },
  points: { type: Number, default: 0 },
  question: String,
  choices: [{
    text: String,
    isCorrect: Boolean
  }],
  correctAnswer: String,
  possibleAnswers: [String],
});

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
  description: String,
  quizType: {
    type: String,
    enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
    default: "Graded Quiz"
  },
  points: { type: Number, default: 0 },
  assignmentGroup: {
    type: String,
    enum: ["Quizzes", "Exams", "Assignments", "Project"],
    default: "Quizzes"
  },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  howManyAttempts: { type: Number, default: 1 },
  showCorrectAnswers: String,
  accessCode: String,
  oneQuestionAtTime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },
  dueDate: String,
  availableDate: String,
  untilDate: String,
  published: { type: Boolean, default: false },
  questions: [questionSchema]
},
{ collection: "quizzes" });

export default schema;