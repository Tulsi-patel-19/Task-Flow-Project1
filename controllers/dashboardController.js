import Task from "../models/Task.js";
import Project from "../models/Project.js";

const getDashboardStats = async (req, res) => {
    try {
        // just query of mongoDB
        const userId = req.user._id;  //to identify the current user

        const projects = await Project.find({
            owner :userId
        });

        const projectIds = projects.map(project => project._id);

        const totalProjects = projects.length;

        const totalTasks = await Task.countDocuments({
            // count the Task ,that belong to this project id
            project : {$in : projectIds }
        });

        const completedTasks = await Task.countDocuments({
            project : {$in : projectIds },
            status :"completed"
        }) 

        const pendingTasks = await Task.countDocuments({
            project : {$in : projectIds },
            status :"pending"
        })

        const inProgressTask = await Task.countDocuments({
            project : {$in : projectIds },
            status : "In-progress"
        });

        const highPrioriryTasks = await Task.countDocuments({
            project :{ $in : projectIds},
            priority :"high"
        })

        const overdueTasks = await Task.countDocuments({
            project :{ $in : projectIds },
            dueDate : { $lt : new Date()},
            status : { $ne :"completed" }
        });

        res.status(200).json({
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTask,
            highPrioriryTasks,
            overdueTasks
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to get dashboard statistics",
            error: error.message
        });
    }
};

export default getDashboardStats;