const Folder = require('../models/Folder');
const Project = require('../models/Project');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id }).sort({ updatedAt: -1 });
    return sendSuccess(res, 'Folders loaded', folders);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const createFolder = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name?.trim()) {
      return sendError(res, 'Folder name is required', 400);
    }

    const folder = await Folder.create({
      user: req.user._id,
      name: name.trim(),
      color
    });

    return sendSuccess(res, 'Folder created', folder, 201);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const updateFolder = async (req, res) => {
  try {
    const folder = await Folder.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      {
        name: req.body.name,
        color: req.body.color
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!folder) {
      return sendError(res, 'Folder not found', 404);
    }

    return sendSuccess(res, 'Folder updated', folder);
  } catch (error) {
    return sendError(res, error.message);
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!folder) {
      return sendError(res, 'Folder not found', 404);
    }

    await Project.updateMany(
      {
        user: req.user._id,
        folder: folder.name
      },
      {
        folder: 'Launchpad'
      }
    );

    return sendSuccess(res, 'Folder deleted');
  } catch (error) {
    return sendError(res, error.message);
  }
};

module.exports = {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder
};
