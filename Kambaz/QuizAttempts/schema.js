import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  answer: String,
  isCorrect: Boolean,
  pointsEarned: { type: Number, default: 0 },
});

const schema = new mongoose.Schema({
  _id: String,
  quiz: { type: String, ref: "QuizModel", required: true },
  user: { type: String, ref: "UserModel", required: true },
  answers: [answerSchema],
  score: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  attemptNumber: { type: Number, default: 1 },
  submittedAt: { type: Date, default: Date.now },
},
{ collection: "quizAttempts" });

schema.index({ quiz: 1, user: 1 });

export default schema;