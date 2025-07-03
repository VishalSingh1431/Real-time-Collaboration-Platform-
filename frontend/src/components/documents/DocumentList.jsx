import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import documentService from '../../services/documentService';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await documentService.getAll();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <List>
      {documents.map((doc) => (
        <ListItem key={doc._id}>
          <ListItemText primary={doc.title} />
          <Button 
            component="a" 
            href={`/documents/${doc._id}`}
            variant="contained"
            color="primary"
          >
            Open
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default DocumentList;