require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML file
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle file upload at the '/api/fileanalyse' endpoint
const upload = multer(); // Initialize multer without specifying storage (in-memory storage)
app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  })

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
