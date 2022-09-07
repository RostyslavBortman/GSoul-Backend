require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
var bodyParser = require('body-parser');
const formData = require('express-form-data');

const atalsConnUri = 'mongodb+srv://GSoul:GSoul12@cluster0.i5wqp6u.mongodb.net/GSoulName?retryWrites=true&w=majority';
let PORT = +process.env.PORT || 7516;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json);
//form-urlencoded

// parse data with connect-multiparty.
app.use(formData.parse());
// app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(atalsConnUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
	console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
	process.exit();
});

//=== 3 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);

//=== 4 - START SERVER
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT + '/'));
