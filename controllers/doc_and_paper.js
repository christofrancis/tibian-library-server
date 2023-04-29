const Doc_and_paper = require("../models/doc_and_paper");
const slugify = require("slugify");

//method for creating doc_and_paper
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

  //method for creating doc_and_paper
  Doc_and_paper.create(
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
    (err, doc_and_paper) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          error:
            "Sprawdź czy wprowadzone dane są zgodne z Doc and paper Model Scheme lub czy nazwa nie jest już zajęta.",
        });
      }
      res.json(doc_and_paper);
    }
  );
};

//method for listing all docs_and_papers
exports.list = (req, res) => {
  Doc_and_paper.find({})
    // .limit(20)
    .sort({ title: 1 })
    .exec((err, docs_and_papers) => {
      if (err) console.log(err);
      res.json(docs_and_papers);
    });
};

//method for getting specific doc_and_paper based on slug
exports.read = (req, res) => {
  const { slug } = req.params;
  Doc_and_paper.findOne({ slug }).exec((err, doc_and_paper) => {
    if (err) console.log(err);
    res.json(doc_and_paper);
  });
};

// method for editing doc_and_paper
exports.edit = (req, res) => {
  const { slug } = req.params;
  const { cover, title, location, content, finder, keywords, map_pin } =
    req.body;
  Doc_and_paper.findOneAndUpdate(
    { slug },
    { cover, title, location, content, finder, keywords, map_pin },
    { new: true }
  ).exec((err, doc_and_paper) => {
    if (err) console.log(err);
    res.json(doc_and_paper);
  });
};

//method for removing doc_and_paper
exports.remove = (req, res) => {
  const { slug } = req.params;
  Doc_and_paper.findOneAndRemove({ slug }).exec((err, doc_and_paper) => {
    if (err) console.log(err);
    res.json({
      message: "Item deleted.",
    });
  });
};
