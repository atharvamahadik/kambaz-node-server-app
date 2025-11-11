import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findAllEnrollments = (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  };

  app.post("/api/users/:userId/courses/:courseId/enroll", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId/unenroll", unenrollUserFromCourse);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/enrollments", findAllEnrollments);
}