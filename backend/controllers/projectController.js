// backend/controllers/projectController.js

const Project = require('../models/Project');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      user: req.user._id
    }).sort({ updatedAt: -1 });

    return sendSuccess(res, 'Projects loaded', projects);

  } catch (error) {

    return sendError(res, error.message);
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id
    })
      .populate('styleVersions')
      .populate('improvementReports');

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, 'Project loaded', project);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const createProject = async (req, res) => {

  try {

    const {
      title,
      prompt,
      generatedCode,
      folder,
      status,
      favorite,
      tags,
      layout,
      style,
      projectType
    } = req.body;

    const project = await Project.create({
      user: req.user._id,
      title: title || 'Untitled AI Project',
      prompt: prompt || 'Generated with ProjectMaker AI',
      generatedCode,
      folder: folder || 'Launchpad',
      status: status || 'Generated',
      style: style || 'Minimal SaaS',
      projectType: projectType || 'Website',
      favorite: Boolean(favorite),
      tags: Array.isArray(tags) ? tags.slice(0, 8) : [],
      layout,
      versions: generatedCode
        ? [
            {
              title: title || 'Initial generation',
              prompt: prompt || '',
              generatedCode
            }
          ]
        : []
    });

    return sendSuccess(res, 'Project created', project, 201);

  } catch (error) {

    return sendError(res, error.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    const allowedFields = [
      'title',
      'prompt',
      'generatedCode',
      'folder',
      'status',
      'favorite',
      'tags',
      'layout',
      'style',
      'projectType'
    ];

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        project[field] = req.body[field];
      }
    });

    if (req.body.generatedCode) {
      project.versions.push({
        title: req.body.title || project.title,
        prompt: req.body.prompt || project.prompt,
        generatedCode: req.body.generatedCode
      });
    }

    const updatedProject = await project.save();

    return sendSuccess(res, 'Project updated', updatedProject);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, 'Project deleted');
  } catch (error) {
    return sendError(res, error.message);
  }
};

const duplicateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    const copy = await Project.create({
      user: req.user._id,
      title: `${project.title} copy`,
      prompt: project.prompt,
      generatedCode: project.generatedCode,
      folder: project.folder,
      status: 'Duplicated',
      style: project.style,
      projectType: project.projectType,
      favorite: false,
      tags: project.tags,
      layout: project.layout,
      versions: project.generatedCode
        ? [
            {
              title: `${project.title} copy`,
              prompt: project.prompt,
              generatedCode: project.generatedCode
            }
          ]
        : []
    });

    return sendSuccess(res, 'Project duplicated', copy, 201);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    project.favorite = !project.favorite;
    const updatedProject = await project.save();

    return sendSuccess(res, 'Favorite updated', updatedProject);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const getProjectAnalytics = async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.user._id
    });

    const exports = projects.reduce(
      (total, project) => total + (project.exports?.length || 0),
      0
    );

    return sendSuccess(res, 'Project analytics loaded', {
      totalProjects: projects.length,
      favoriteProjects: projects.filter((project) => project.favorite).length,
      exports,
      creditsUsed: projects.length * 8 + exports * 2,
      creditsLimit: 500,
      folders: [...new Set(projects.map((project) => project.folder || 'Launchpad'))]
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  duplicateProject,
  toggleFavorite,
  getProjectAnalytics
};
