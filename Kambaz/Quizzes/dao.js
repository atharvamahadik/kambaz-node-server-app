import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao() {
  async function createQuiz(quiz) {
    const newQuiz = { 
      ...quiz, 
      _id: uuidv4(),
      questions: quiz.questions || []
    };
    return await model.create(newQuiz);
  }

  async function findQuizzesForCourse(courseId) {
    return await model.find({ course: courseId });
  }

  async function findQuizById(quizId) {
    return await model.findOne({ _id: quizId });
  }

  async function deleteQuiz(quizId) {
    return await model.deleteOne({ _id: quizId });
  }

  async function updateQuiz(quizId, quizUpdates) {
    return await model.updateOne({ _id: quizId }, { $set: quizUpdates });
  }

  async function addQuestionToQuiz(quizId, question) {
    const questionWithId = { ...question, _id: uuidv4() };
    const quiz = await model.findOne({ _id: quizId });
    if (quiz) {
      quiz.questions.push(questionWithId);
      quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
      await quiz.save();
      return questionWithId;
    }
    return null;
  }

  async function updateQuestion(quizId, questionId, questionUpdates) {
    const quiz = await model.findOne({ _id: quizId });
    if (quiz) {
      const questionIndex = quiz.questions.findIndex(q => q._id === questionId);
      if (questionIndex !== -1) {
        quiz.questions[questionIndex] = { 
          ...quiz.questions[questionIndex].toObject(), 
          ...questionUpdates 
        };
        quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
        await quiz.save();
        return quiz.questions[questionIndex];
      }
    }
    return null;
  }

  async function deleteQuestion(quizId, questionId) {
    const quiz = await model.findOne({ _id: quizId });
    if (quiz) {
      quiz.questions = quiz.questions.filter(q => q._id !== questionId);
      quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
      await quiz.save();
      return true;
    }
    return false;
  }

  return {
    createQuiz,
    findQuizzesForCourse,
    findQuizById,
    deleteQuiz,
    updateQuiz,
    addQuestionToQuiz,
    updateQuestion,
    deleteQuestion,
  };
}