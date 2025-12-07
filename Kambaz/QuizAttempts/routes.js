import QuizAttemptsDao from "./dao.js";
import QuizzesDao from "../Quizzes/dao.js";

export default function QuizAttemptsRoutes(app) {
  const attemptsDao = QuizAttemptsDao();
  const quizzesDao = QuizzesDao();

  const submitAttempt = async (req, res) => {
    try {
      const { quizId } = req.params;
      const { userId, answers } = req.body;

      const quiz = await quizzesDao.findQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      if (!quiz.published) {
        return res.status(403).json({ error: "Quiz is not available" });
      }

      const attemptCount = await attemptsDao.countAttempts(quizId, userId);
      const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
      
      if (attemptCount >= maxAttempts) {
        return res.status(403).json({ error: "Maximum attempts reached" });
      }

      let score = 0;
      const gradedAnswers = answers.map((ans) => {
        const question = quiz.questions.find((q) => q._id === ans.questionId);
        if (!question) return { ...ans, isCorrect: false, pointsEarned: 0 };

        let isCorrect = false;

        if (question.type === "multiple-choice" && question.choices) {
          const correctChoice = question.choices.find((c) => c.isCorrect);
          isCorrect = correctChoice && ans.answer === correctChoice.text;
        } else if (question.type === "true-false") {
          isCorrect = ans.answer === question.correctAnswer;
        } else if (question.type === "fill-in-blank" && question.possibleAnswers) {
          isCorrect = question.possibleAnswers.some(
            (possible) => possible.toLowerCase() === ans.answer?.toLowerCase()
          );
        }

        const pointsEarned = isCorrect ? question.points : 0;
        score += pointsEarned;

        return {
          questionId: ans.questionId,
          answer: ans.answer,
          isCorrect,
          pointsEarned,
        };
      });

      const attempt = await attemptsDao.createAttempt({
        quiz: quizId,
        user: userId,
        answers: gradedAnswers,
        score,
        totalPoints: quiz.points,
        attemptNumber: attemptCount + 1,
      });

      res.json(attempt);
    } catch (error) {
      console.error("Error submitting attempt:", error);
      res.status(500).json({ error: "Failed to submit quiz attempt" });
    }
  };

  const getAttemptsForUser = async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const attempts = await attemptsDao.findAttemptsForQuizByUser(quizId, userId);
      res.json(attempts);
    } catch (error) {
      console.error("Error fetching attempts:", error);
      res.status(500).json({ error: "Failed to fetch attempts" });
    }
  };

  const getLatestAttempt = async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const attempt = await attemptsDao.findLatestAttempt(quizId, userId);
      res.json(attempt);
    } catch (error) {
      console.error("Error fetching latest attempt:", error);
      res.status(500).json({ error: "Failed to fetch latest attempt" });
    }
  };

  const getAttemptCount = async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const count = await attemptsDao.countAttempts(quizId, userId);
      res.json({ count });
    } catch (error) {
      console.error("Error counting attempts:", error);
      res.status(500).json({ error: "Failed to count attempts" });
    }
  };

  app.post("/api/quizzes/:quizId/attempts", submitAttempt);
  app.get("/api/quizzes/:quizId/attempts/:userId", getAttemptsForUser);
  app.get("/api/quizzes/:quizId/attempts/:userId/latest", getLatestAttempt);
  app.get("/api/quizzes/:quizId/attempts/:userId/count", getAttemptCount);
}