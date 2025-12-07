import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
    const dao = QuizzesDao();  
    
    const findQuizzesForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const quizzes = await dao.findQuizzesForCourse(courseId);
            res.json(quizzes);
        } catch (error) {
            console.error("Error finding quizzes:", error);
            res.status(500).json({ error: "Failed to fetch quizzes" });
        }
    };

    const findPublishedQuizzesForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const quizzes = await dao.findQuizzesForCourse(courseId);
            const publishedQuizzes = quizzes.filter(q => q.published === true);
            res.json(publishedQuizzes);
        } catch (error) {
            console.error("Error finding published quizzes:", error);
            res.status(500).json({ error: "Failed to fetch published quizzes" });
        }
    };
    
    const findQuizById = async (req, res) => {
        try {
            const { quizId } = req.params;
            const quiz = await dao.findQuizById(quizId);
            res.json(quiz);
        } catch (error) {
            console.error("Error finding quiz:", error);
            res.status(500).json({ error: "Failed to fetch quiz" });
        }
    };
    
    const createQuizForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const quiz = { ...req.body, course: courseId };
            const newQuiz = await dao.createQuiz(quiz);
            res.json(newQuiz);
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ error: "Failed to create quiz" });
        }
    };

    const deleteQuiz = async (req, res) => {
        try {
            const { quizId } = req.params;
            const status = await dao.deleteQuiz(quizId);
            res.json(status);
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).json({ error: "Failed to delete quiz" });
        }
    };

    const updateQuiz = async (req, res) => {
        try {
            const { quizId } = req.params;
            const quizUpdates = req.body;
            const updatedQuiz = await dao.updateQuiz(quizId, quizUpdates);
            res.json(updatedQuiz);
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(500).json({ error: "Failed to update quiz" });
        }
    };

    const addQuestionToQuiz = async (req, res) => {
        try {
            const { quizId } = req.params;
            const question = req.body;
            const newQuestion = await dao.addQuestionToQuiz(quizId, question);
            res.json(newQuestion);
        } catch (error) {
            console.error("Error adding question:", error);
            res.status(500).json({ error: "Failed to add question" });
        }
    };

    const updateQuestion = async (req, res) => {
        try {
            const { quizId, questionId } = req.params;
            const questionUpdates = req.body;
            const updatedQuestion = await dao.updateQuestion(quizId, questionId, questionUpdates);
            res.json(updatedQuestion);
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(500).json({ error: "Failed to update question" });
        }
    };

    const deleteQuestion = async (req, res) => {
        try {
            const { quizId, questionId } = req.params;
            const status = await dao.deleteQuestion(quizId, questionId);
            res.json(status);
        } catch (error) {
            console.error("Error deleting question:", error);
            res.status(500).json({ error: "Failed to delete question" });
        }
    };

    app.get("/api/courses/:courseId/quizzes/published", findPublishedQuizzesForCourse);
    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
    app.get("/api/quizzes/:quizId", findQuizById);
    app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
    app.put("/api/quizzes/:quizId", updateQuiz);
    app.post("/api/quizzes/:quizId/questions", addQuestionToQuiz);
    app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
    app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestion);
}