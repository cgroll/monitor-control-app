import 'dotenv/config';

import express from 'express';
import axios from 'axios';
import cors from 'cors';

// Initialize the Express app
const app = express();
const PORT = 5000;

// --- Middleware ---
// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- API Endpoint ---
// This endpoint receives the display number from the React app and forwards it
app.post('/api/send-display-number', async (req, res) => {
  const { message } = req.body;

  // Basic validation
  if (!message) {
    return res.status(400).json({ error: 'A "message" field is required in the request body.' });
  }

  const displayNumber = parseInt(message);
  if (isNaN(displayNumber) || displayNumber < 1 || displayNumber > 4) {
    return res.status(400).json({ error: 'Message must be a number between 1 and 4.' });
  }

  const displayUrl = `http://localhost:8080/display/${displayNumber}`;
  console.log(`Received display number: ${displayNumber}. Forwarding to display service...`);

  try {
    // Forward the display number to the local display service
    const response = await axios.post(displayUrl);
    console.log('Successfully sent display number.');
    res.status(200).json({ success: true, message: 'Display number sent successfully.' });

  } catch (error) {
    console.error('Error sending display number:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to send display number.' });
  }
});

// --- Start the Server ---
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});