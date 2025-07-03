import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import documentService from '../../services/documentService';

const DocumentEditor = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await documentService.get(id);
      setContent(doc.content);
    };
    if (id) fetchDocument();
  }, [id]);

  const handleSave = async () => {
    await documentService.save(id, { content });
  };

  return (
    <div>
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default DocumentEditor;