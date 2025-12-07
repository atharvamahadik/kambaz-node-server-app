import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  const enrollUserInCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      const enrollment = await dao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ error: "Enrollment failed" });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    try {
      await dao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).json({ error: "Unenrollment failed" });
    }
  };

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = await dao.findEnrollmentsForUser(userId);
      console.log("Enrollments for user", userId, ":", enrollments);
      res.json(enrollments);
    } catch (error) {
      console.error("Error finding enrollments:", error);
      res.status(500).json({ error: "Failed to fetch enrollments" });
    }
  };

  const findAllEnrollments = async (req, res) => {
    try {
      const enrollments = await dao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      console.error("Error finding all enrollments:", error);
      res.status(500).json({ error: "Failed to fetch all enrollments" });
    }
  };

  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId/unenroll", unenrollUserFromCourse);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/enrollments", findAllEnrollments);
}