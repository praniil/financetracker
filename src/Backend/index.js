const express = require('express');
const cors = require('cors');
const routes = require('./Routes/routes.js');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

app.use('/api', routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
