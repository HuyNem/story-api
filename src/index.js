const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8080;

const route = require('./routes');

//connect to db
const db = require('./db/database');
db.connect();

app.use(cors());
app.use(express.json());

route(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});