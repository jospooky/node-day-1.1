const JsonDB = require('node-json-db');
const db = new JsonDB("myDataBase", true, false);

try {
  db.getData('/books');
}catch(err){
  db.push('/books' , require('./../data/books'))
}

module.exports = {
  getBooks: function(req, res){
    let books = db.getData('/books');
    res.send(books);
  },
  createBook:function(req, res){
    let books = db.getData('/books');
    if (!req.body.title){
      return res.status(400).send("All books must have a title");
    }
    req.body.votes = 0;
    req.body.id = (books[books.length-1]?books[books.length-1].id + 1:1);
    books.push(req.body)
    db.push('/books' , books)
    res.send(books);
  },
  updateBook: function (req, res) {
    let books = db.getData('/books');
    console.log(req.params.id);
    // for (let i =0;i<books.length;i++){
    //   if (books[i].id === req.params.id * 1){
    //     // Edit book
    //     Object.assign( books[i], req.body);
    //     // Send book back to front end.
    //     return res.send(books[i]);
    //   }
    // }

    let bookToEdit = books.find(book=>book.id=== req.params.id * 1)
    Object.assign(bookToEdit, req.body);
    db.push('/books' , books)
    res.send(bookToEdit);
  },
  deleteBook: function (req, res){
    let books = db.getData('/books');
    books = books.filter(book=>book.id!==req.params.id*1)
    db.push('/books' , books)
    res.send(books);
  },
  upvoteBook:function (req, res){
    let books = db.getData('/books');
    let bookToUpvote = books.find(book=>book.id=== req.params.id * 1)
    bookToUpvote.votes++;
    db.push('/books' , books)
    res.send(`${bookToUpvote.title} now has ${bookToUpvote.votes} votes`);
  },
}
