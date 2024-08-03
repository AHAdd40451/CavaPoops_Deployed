import { Team } from "../models/team.model.js";

// Create a new Team member
export const createTeamMember = async (req, res) => {
  try {
    const teamMember = new Team(req.body);
    await teamMember.save();
    return res.status(201).json({ message: "Team member created successfully", teamMember });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the team member.",
      details: error.message,
    });
  }
};

// Get a Team member by ID
export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findById(id);

    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found." });
    }

    return res.json(teamMember);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the team member.",
      details: error.message,
    });
  }
};

// Get all Team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    return res.json(teamMembers);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while retrieving the team members.",
      details: error.message,
    });
  }
};

// Update a Team member by ID
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found." });
    }

    return res.json({ message: "Team member updated successfully", teamMember });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the team member.",
      details: error.message,
    });
  }
};

// Delete a Team member by ID
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findByIdAndDelete(id);

    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found." });
    }

    return res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while deleting the team member.",
      details: error.message,
    });
  }
};
