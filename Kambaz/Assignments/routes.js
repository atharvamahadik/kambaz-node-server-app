import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
    const dao = AssignmentsDao(db);  
    
    const findAssignmentsForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.status(200).json(assignments);
    };
    
    const createAssignmentForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignment = { ...req.body, course: courseId };
        const newAssignment = dao.createAssignment(assignment);
        res.status(200).json(newAssignment);
    };

    const deleteAssignment = (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        res.status(200).json(status);
    };

    const updateAssignment = (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = dao.updateAssignment(
            assignmentId,
            assignmentUpdates
        );
        res.status(200).json(updatedAssignment);
    };

    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
    app.put("/api/assignments/:assignmentId", updateAssignment);
}