const express = require('express');
const { createDocument, getDocuments, getDocument, updateDocument } = require('../controllers/documentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.post('/', createDocument);
router.get('/', getDocuments);
router.get('/:id', getDocument);
router.put('/:id', updateDocument);

module.exports = router;