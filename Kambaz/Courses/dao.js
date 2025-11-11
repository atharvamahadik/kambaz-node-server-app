import { v4 as uuidv4 } from "uuid"; 
import * as dbModule from "../Database/index.js"; 

export default function CoursesDao(db) { 
    let courses = [...dbModule.courses]; 
    let enrollments = [...dbModule.enrollments]; 
    function findAllCourses() { 
        return courses; 
    } 
    function findCoursesForEnrolledUser(userId) { 
        return courses.filter((course) => 
            enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id)); 
    } 
    function createCourse(course) { 
        const newCourse = { ...course, _id: uuidv4() }; 
        courses.push(newCourse); 
        return newCourse; 
    } 
    function deleteCourse(courseId) { 
        courses = courses.filter((course) => course._id !== courseId); 
        enrollments = enrollments.filter((enrollment) => enrollment.course !== courseId);
    } 
    function updateCourse(courseId, courseUpdates) {
         const { courses } = db; 
         const course = courses.find((course) => course._id === courseId); 
         Object.assign(course, courseUpdates); 
         return course; 
    } 


 return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse }; 

}