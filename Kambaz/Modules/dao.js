import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {

    function createModule(module) {
        const newModule = { ...module, _id: uuidv4() };
        db.modules.push(newModule);
        return newModule;
    }

    function findModulesForCourse(courseId) {
        const { modules } = db;
        return modules.filter((module) => module.course === courseId);
    }
    function deleteModule(moduleId) {
        const index = db.modules.findIndex((m) => m._id === moduleId);
        if (index !== -1) {
            db.modules.splice(index, 1);
        }
    }
    function updateModule(moduleId, moduleUpdates) {
        const { modules } = db;
        const module = modules.find((module) => module._id === moduleId);
        Object.assign(module, moduleUpdates);
        return module;
    }

    return {
        createModule,
        findModulesForCourse,
        deleteModule,
        updateModule
    };
}