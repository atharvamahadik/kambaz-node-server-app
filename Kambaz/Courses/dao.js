import { v4 as uuidv4 } from "uuid";
import * as dbModule from "../Database/index.js";
import model from "./model.js";

export default function CoursesDao() {
    let courses = [...dbModule.courses];
    let enrollments = [...dbModule.enrollments];
    function findAllCourses() {
        return model.find({}, { name: 1, description: 1});
    }
    async function findCoursesForEnrolledUser(userId) {
        const courses = await model.find({}, { name: 1, description: 1});
        return courses.filter((course) =>
            enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    }
    function createCourse(course) {
        const newCourse = { ...course, _id: uuidv4() };
        return model.create(newCourse);
    }
    function deleteCourse(courseId) {
        return model.deleteOne({ _id: courseId });
    }
    function updateCourse(courseId, courseUpdates) {
        return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    }


    return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };

}