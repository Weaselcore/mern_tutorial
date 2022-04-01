// app.js

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@cluster0.7l4jv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// mongodb+srv://admin:<password>@cluster0.7l4jv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// Accessing the path module
const path = require("path");

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: true }));

// use Routes
app.use('/api/books', books);

//app.get('/', (req, res) => res.send('Hello world!'));

// Step 1:
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));