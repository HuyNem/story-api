const express = require('express');
const createError = require('http-errors');
const { default: mongoose } = require('mongoose');
path = require('path');
cors = require('cors');
bodyParser = require('body-parser');
dbConfig = require('./db/database');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database connection');
},
    err => {
        console.log('Database could not be connected: ', err)
    }
);

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

const userRoute = require('./routes/category.routes');
app.use('/admin/category', userRoute);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
