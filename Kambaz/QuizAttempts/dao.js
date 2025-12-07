import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao() {
  async function createAttempt(attempt) {
    const newAttempt = {
      ...attempt,
      _id: uuidv4(),
      submittedAt: new Date(),
    };
    return await model.create(newAttempt);
  }

  async function findAttemptsForQuizByUser(quizId, userId) {
    return await model.find({ quiz: quizId, user: userId }).sort({ submittedAt: -1 });
  }

  async function findLatestAttempt(quizId, userId) {
    return await model.findOne({ quiz: quizId, user: userId }).sort({ submittedAt: -1 });
  }

  async function countAttempts(quizId, userId) {
    return await model.countDocuments({ quiz: quizId, user: userId });
  }

  async function findAttemptById(attemptId) {
    return await model.findOne({ _id: attemptId });
  }

  async function deleteAttemptsForQuiz(quizId) {
    return await model.deleteMany({ quiz: quizId });
  }

  async function deleteUserAttemptsForQuiz(quizId, userId) {
    return await model.deleteMany({ quiz: quizId, user: userId });
  }

  return {
    createAttempt,
    findAttemptsForQuizByUser,
    findLatestAttempt,
    countAttempts,
    findAttemptById,
    deleteAttemptsForQuiz,
    deleteUserAttemptsForQuiz,
  };
}