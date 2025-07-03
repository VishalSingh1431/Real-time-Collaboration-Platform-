const Document = require('../models/Document');

const createDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const document = new Document({
      title,
      owner: req.user.id
    });
    await document.save();
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    });
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDocument = async (req, res) => {
  try {
    const { content } = req.body;
    const document = await Document.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [
          { owner: req.user.id },
          { collaborators: req.user.id }
        ]
      },
      { content },
      { new: true }
    );
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createDocument, getDocuments, getDocument, updateDocument };