// Template Controller
// Manages website templates

export const getAllTemplates = async (req, res) => {
  try {
    // TODO: Fetch all available templates
    res.status(200).json({ templates: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTemplate = async (req, res) => {
  try {
    // TODO: Get specific template
    res.status(200).json({ template: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
