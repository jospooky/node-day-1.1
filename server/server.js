const express = require('express');
const app  = express();
const port = 8080;
const bodyParser = require('body-parser');

// Controllers
const booksCtrl = require('./controllers/booksCtrl')

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../build`))

app.get('/api/hello', (req, res)=>{
  console.log("Hello I've been hit!!!");
  res.send("Welcome to my first endpoint");
})

app.get('/api/books', booksCtrl.getBooks)
app.post('/api/books', booksCtrl.createBook)
app.put('/api/books/:id', booksCtrl.updateBook)
app.delete('/api/books/:id', booksCtrl.deleteBook)
app.patch('/api/books/:id/upvote', booksCtrl.upvoteBook)


app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
