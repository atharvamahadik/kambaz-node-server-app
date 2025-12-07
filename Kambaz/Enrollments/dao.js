import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function EnrollmentsDao() {
  async function enrollUserInCourse(userId, courseId) {
    // Check if already enrolled to prevent duplicates
    const existing = await model.findOne({ user: userId, course: courseId });
    if (existing) {
      return existing;
    }
    
    return await model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  async function unenrollUserFromCourse(userId, courseId) {
    return await model.deleteOne({ user: userId, course: courseId });
  }

  async function findEnrollmentsForUser(userId) {
    const enrollments = await model.find({ user: userId });
    return enrollments;
  }

  async function findAllEnrollments(courseId) {
    const enrollments = await model.find(courseId ? { course: courseId } : {});
    return enrollments;
  }

  async function unenrollAllUsersFromCourse(courseId) {
    return await model.deleteMany({ course: courseId });
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findAllEnrollments,
    unenrollAllUsersFromCourse,
  };
}