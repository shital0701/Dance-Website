const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactofDanceWeb', { useNewurlParser: true, });
const port = 80;

const Contactschema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

const Contact = mongoose.model('Contact', Contactschema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  const con = "this is the best content on the internet so far so use it wisely"
  const params = {}
  res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res) => {
  const con = "this is the best content on the internet so far so use it wisely"
  const params = {}
  res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("This item has been saved to the database")
    res.status(400).send("Item was not saved to the database")
  });

 // res.status(200).render('contact.pug')
})

app.listen(port, () => {
  console.log(`This application started succesfully on port ${port}`);
});