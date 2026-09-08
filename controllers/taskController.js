import Task from "../models/Task.js";

// create task 
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, project, assignedTo } = req.body;

        // basic validation of data

        if (!title || !description || !dueDate || !project || !assignedTo) {
            return res.status(400).json({
                message: "Title , description, dueDate , project , anf assginedTo are Required",

            });
        }

        const tasks = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            project,
            assignedTo,
        });

        res.status(201).json({
            message: "Task created Successfully",
            tasks,
        });

    }

    catch (error) {
        res.status(500).json({
            message: "Failed to Create Task ",
            error: error.message,
        });
    }

};

// Get all task 
const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(201).json({
            message: "Task Fetched Successfully",
            tasks,
        });

    }
    catch (error) {
        res.status(500).json({
            message: "Failed to Fetch Task ",
            error: error.message,
        });
    }
};

// get single task
const getSingleTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task Not Found",
            });
        }

        res.status(200).json({
            message: "Task Fetched Successfully",
            task,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch task",
            error: error.message,

        });
    }
};


// Update Task 

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const { title,
            description,
            status,
            priority,
            dueDate,
            project,
            assignedTo, } = req.body;


        task.title = title;
        task.description = description;
        task.status = status;
        task.priority = priority;
        task.dueDate = dueDate;
        task.project = project;
        task.assignedTo = assignedTo;

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update task",
            error: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        await Task.findByIdAndDelete(id);

        res.status(200).json({
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message,
        });
    }
}

export {
    createTask,
    getAllTask,
    getSingleTask,
    updateTask,
    deleteTask,
};