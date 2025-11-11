import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const already = enrollments.find(e => e.user === userId && e.course === courseId);
    if (!already) {
      enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    }
  }

  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    const index = enrollments.findIndex(e => e.user === userId && e.course === courseId);
    if (index !== -1) {
    enrollments.splice(index, 1);
  }
  }

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter(e => e.user === userId);
  }

  function findAllEnrollments() {
    return db.enrollments;
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findAllEnrollments,
  };
}