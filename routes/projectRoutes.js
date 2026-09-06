import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { createProject ,
     getAllProjects ,
     getSingleProject ,
     updateProject ,
     deleteProject } from "../controllers/projectController.js";


const router = express.Router();

router.post("/",authMiddleware,createProject);

router.get("/",authMiddleware ,getAllProjects);

router.get("/:id",authMiddleware ,getSingleProject);

router.put("/:id",authMiddleware ,updateProject);

router.delete("/:id",authMiddleware ,deleteProject);

export default router;
