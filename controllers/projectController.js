import mongoose from "mongoose";
import Project from "../models/Project.js";

// create project

const createProject = async (req, res) => {
    try {

        const { name, description, members, deadline } = req.body;

        if(!name || !description || !members || !deadline){
            return res.status(400).json({
                message :"Name , description and deadline are required",
            });
        }

        const project = await Project.create({
            name,
            description,
            members,
            deadline,
            owner: req.user._id,
        });

        res.status(201).json({
            message: "Project created successfully ",
            project,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create the project ",
            error: error.message,
        });
    }
};


// Get All Projects 
// project.find() => tells that give me all documnets from Project collection 

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json({
            message: "Project fetched successfully",
            projects,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects ",
            error: error.message,
        });
    }
};


// for get a single project

const getSingleProject = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message :"Invalid project ID",
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        res.status(200).json({
            message: "Project Fetch Successfully",
            project,
        });
    }

    catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects ",
            error: error.message,
        });
    }
};

// Update the project 
// we also check that only owner can update the project 
const updateProject = async (req, res) => {
    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        // check the project owner 

        if(project.owner.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message :"You are not allowed to update this project",
            });
        }

        const { name, description, members, deadline } = req.body;

        project.name = name;
        project.description = description;
        project.members = members;
        project.deadline = deadline;

        await project.save();

        res.status(200).json({
            message: "Project Updated Successfully",
            project,
        });
    }

    catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects ",
            error: error.message,
        });
    }
}

// Delete the project
// same as only delete  by owner 

const deleteProject = async (req, res) => {
    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        // check the project owner
        if(project.owner.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "You are not allowed to delete this project",
            });
        }

        await Project.findByIdAndDelete(id);

        res.status(200).json({
            message: "project Delete Successfully",
        });
    }

    catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects ",
            error: error.message,
        });
    }
}

export {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject
};