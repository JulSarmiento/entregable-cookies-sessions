require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => console.log(`Server up and running o port ${PORT}`));

server.on('error', error => console.error(error));