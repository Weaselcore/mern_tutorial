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
var cors = require('cors');
const mongoose = require('mongoose');

// Accessing the path module
const path = require("path");

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database

try {
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log('MongoDB is Connected...');
} catch (err) {
  console.error(err.message);
  process.exit(1);
};


// cors
app.use(cors());

// Init Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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