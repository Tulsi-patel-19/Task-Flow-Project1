import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import {
    createTask,
    getAllTask,
    getSingleTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/",authMiddleware, createTask);

router.get("/",authMiddleware, getAllTask);

router.get("/:id",authMiddleware, getSingleTask);

router.get("/:id",authMiddleware, updateTask);

router.get("/:id",authMiddleware, deleteTask);


export default router;