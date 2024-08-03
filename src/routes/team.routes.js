import express from "express";
import {
  createTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
} from "../controllers/team.controller.js";

const teamRoutes = express.Router();

// Create a Team member
teamRoutes.post("/team", createTeamMember);

// Get a Team member by ID
teamRoutes.get("/team/:id", getTeamMemberById);

// Get all Team members
teamRoutes.get("/teams", getAllTeamMembers);

// Update a Team member by ID
teamRoutes.put("/team/:id", updateTeamMember);

// Delete a Team member by ID
teamRoutes.delete("/team/:id", deleteTeamMember);

export default teamRoutes;
