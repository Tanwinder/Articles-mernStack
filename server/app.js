// server/app.js

/** require dependencies */
const express = require("express");
const routes = require('./routes/');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cloudinary = require('cloudinary');

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || 'mongodb://Tan:Tan12345@ds243212.mlab.com:43212/articles-app';

/** configure cloudinary */
// cloudinary.config({
//     cloud_name: 'YOUR_CLOUDINARY_NAME_HERE',
//     api_key: 'YOUR_CLOUDINARY_API_KEY_HERE',
//     api_secret: 'YOUR_CLOUDINARY_API_SECRET_HERE'
// })

mongoose
.connect(url,{ useNewUrlParser: true })
.then(_ => {
    console.log('mongoDatabase connected');
})
.catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 5000;

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});