import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments.push(newAssignment);
    return newAssignment;
  }

  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((assignment) => assignment.course === courseId);
  }

  function deleteAssignment(assignmentId) {
    const index = db.assignments.findIndex((a) => a._id === assignmentId);
    if (index !== -1) {
      db.assignments.splice(index, 1);
      return { status: "deleted" };
    }
    return { status: "not_found" };
  }

  function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = db;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (assignment) {
      Object.assign(assignment, assignmentUpdates);
      return assignment;
    }
    return { status: "not_found" };
  }

  return {
    createAssignment,
    findAssignmentsForCourse,
    deleteAssignment,
    updateAssignment,
  };
}
