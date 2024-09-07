const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const suggestionsRoutes = require('../routes/suggestions'); 
dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use('/api/v1', suggestionsRoutes);
  
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
