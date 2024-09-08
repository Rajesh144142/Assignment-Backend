const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const suggestionsRoutes = require('../routes/suggestions'); 
dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

server.use(cors(corsOptions));
server.use(express.json());

server.use('/api/v1/suggestions', suggestionsRoutes);
  
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

