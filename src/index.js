const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


const port = process.env.PORT || 8080;

const route = require('./routes');

//connect to db
const db = require('./db/database');
db.connect();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.json());

route(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});