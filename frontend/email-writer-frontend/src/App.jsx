import { useState } from 'react';
import './App.css';
import { 
  Box, 
  CircularProgress, 
  Container, 
  TextField, 
  Typography,
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Button 
} from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState(''); 
  const [tone, setTone] = useState(''); 
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const respnse = await axios.post("http://localhost:8000/api/email/generate",{
        emailContent,
        tone
      });
      setGeneratedReply(typeof respnse.data === 'string' 
        ? respnse.data 
        : JSON.stringify(respnse.data)
      );
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Writer Frontend
      </Typography>

      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        /> 

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem> {/* Changed to empty string */}
            <MenuItem value="Professional">Professional</MenuItem> {/* Fixed spelling */}
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant="contained"
          //sx={{ mb: 2 }}
          onClick={handleSubmit} 
          disabled={!emailContent || loading}
          fullWidth
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>


      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generatedReply || ''}
          inputProps={{readonly: true}}
          sx={{ mb: 2 }}
        />

        <Button 
        variant='outlined'
        onClick={() => navigator.clipboard.write(generatedReply)}>
          Copy to Clipboard
        </Button>

        </Box> 
    </Container>
  );
}

export default App;
