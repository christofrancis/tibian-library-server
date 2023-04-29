const Book = require("../models/book");
const slugify = require("slugify");

//method for creating book
exports.create = (req, res) => {
  const { cover, title, location, content, finder, keywords, map_pin } =
    req.body; //request body and params
  const slug = slugify(title);

  //validation
  switch (true) {
    case !title:
      return res.status(400).json({ error: "Title is required." });
      break;
    case !location:
      return res.status(400).json({ error: "Location is required." });
      break;
    case !content:
      return res.status(400).json({ error: "Content is required." });
      break;
    case !finder:
      return res.status(400).json({ error: "Finder is required." });
      break;
    case !map_pin:
      return res.status(400).json({ error: "Map pin is required." });
      break;
    case !cover:
      return res.status(400).json({ error: "Cover is required." });
      break;
  }

  //method for creating book
  Book.create(
    {
      cover,
      title,
      location,
      content,
      finder,
      keywords,
      map_pin,
      slug,
    },
    (err, book) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          error:
            "Sprawdź czy wprowadzone dane są zgodne z Book Model Scheme lub czy nazwa nie jest już zajęta.",
        });
      }
      res.json(book);
    }
  );
};

//method for listing all books
exports.list = (req, res) => {
  Book.find({})
    // .limit(20)
    .sort({ title: 1 })
    .exec((err, books) => {
      if (err) console.log(err);
      res.json(books);
    });
};

//method for getting specific book based on slug
exports.read = (req, res) => {
  const { slug } = req.params;
  Book.findOne({ slug }).exec((err, book) => {
    if (err) console.log(err);
    res.json(book);
  });
};

// method for editing book
exports.edit = (req, res) => {
  const { slug } = req.params;
  const { cover, title, location, content, finder, keywords, map_pin } =
    req.body;
  Book.findOneAndUpdate(
    { slug },
    { cover, title, location, content, finder, keywords, map_pin },
    { new: true }
  ).exec((err, book) => {
    if (err) console.log(err);
    res.json(book);
  });
};

//method for removing book
exports.remove = (req, res) => {
  const { slug } = req.params;
  Book.findOneAndRemove({ slug }).exec((err, book) => {
    if (err) console.log(err);
    res.json({
      message: "Book deleted.",
    });
  });
};
