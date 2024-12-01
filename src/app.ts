const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');;

const faqsRoutes = require('./routes/Website/faqs');
const userRoutes = require('./routes/Website/users');
const pageRoutes = require('./routes/Website/page');

const app = express();
app.use(cors());


app.use(bodyParser.json());

app.use('/faqs', faqsRoutes);
app.use('/pages', pageRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // mongoose.connect('mongodb://localhost:27017/testDatabase')

  mongoose.connect('mongodb+srv://thatipamula:venkat1910@cluster0.uo6jc.mongodb.net/testDatabase?retryWrites=true&w=majority')
  .then(result => {
    console.log('Database Connected!')
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
