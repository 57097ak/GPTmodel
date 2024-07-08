import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Collapse, Alert, Link, Card, CardContent } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SummaryScreen = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const summaryHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/openai/summarize", { text }, config);
      setSummary(data.summary);
    //   setError("");

    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        width={isNotMobile ? '60%' : '90%'}
        p="3rem"
        m="3rem auto"
        borderRadius={5}
        boxShadow={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography component="h1" variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
          Text Summarization
        </Typography>
        {error && (
          <Collapse in={error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
        )}
        <Box sx={{ width: '100%' }} component="form" onSubmit={summaryHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="text"
            label="Enter text to summarize"
            name="text"
            multiline
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            InputLabelProps={{ style: { fontSize: '0.9rem' } }}
            InputProps={{ style: { fontSize: '0.9rem' } }}
            sx={{ color: theme.palette.text.primary }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, fontSize: '0.9rem', padding: '0.75rem', backgroundColor: theme.palette.primary.main }}
          >
            Summarize
          </Button>
        </Box>
        {}
        <Card sx={{ mt: 4, width: '100%', boxShadow: 3, border: 1, borderRadius: 2, height: "300px", backgroundColor:"lightgray" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Summary:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {summary || 'Summary will appear here'}
            </Typography>
          </CardContent>
        </Card> 
        <Typography sx={{ mt: 2 }}>
          Not the tool you were looking for? <Link href="/">Go back</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SummaryScreen;
