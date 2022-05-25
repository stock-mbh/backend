const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
multer = require('multer');
const path = require('path');
const passport = require('passport');
const port = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv/config');



// **************************************** CORS ****************************************
var allowedDomains = ['https://djotech.herokuapp.com', 'http://localhost:4200','https://inventorymngt.herokuapp.com'];

/*
var corsOptions = {
  origin: 'https://djotech.herokuapp.com',
  optionsSuccessStatus: 200
}
*/

// CROSS ORIGIN RESOURCE SHARING
app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
//**************************************************************************************************************




app.use(express.static('.'));

const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    console.log(JSON.stringify(file));
    cb(null, file.originalname)
  }
});

let upload = multer({
  storage: storage
});

app.post('/file-upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});


app.use(bodyparser.json());
const productsRoute = require('./routes/products');
const categoriesRoute = require('./routes/categories');
const colorsRoute = require('./routes/colors');
const providersRoute = require('./routes/providers');
const usersRoute = require('./routes/users');
const statsRoute = require('./routes/stats');
const borrowersRoute = require('./routes/borrowers');
const spendingsRoute = require('./routes/spendings');



app.use('/products', productsRoute)
app.use('/colors', colorsRoute)
app.use('/categories', categoriesRoute)
app.use('/providers', providersRoute)
app.use('/users', usersRoute)
app.use('/stats', statsRoute)
app.use('/loans', borrowersRoute)
app.use('/spendings', spendingsRoute)

mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to Database');
  });

require('./config/passport')(passport);

app.use('/', (req, res) => {
  res.json({ message: "Test successful" });
})

app.listen(port);