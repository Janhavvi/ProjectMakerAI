// backend/controllers/projectController.js

const Project = require('../models/Project');

const getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      user: req.user._id
    });

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const createProject = async (req, res) => {

  try {

    const {
      title,
      prompt,
      generatedCode
    } = req.body;

    const project = await Project.create({
      user: req.user._id,
      title,
      prompt,
      generatedCode
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getProjects,
  createProject
};