const Contributor = require("../models/contributor");
const slugify = require("slugify");

exports.create = (req, res) => {
  const { name, role } = req.body; //request body and params
  const slug = slugify(name);

  //validation
  switch (true) {
    case !name:
      return res.status(400).json({ error: "Name is required." });
      break;
    case !role:
      return res.status(400).json({ error: "Role is required." });
      break;
  }

  //method for creating contributor
  Contributor.create({ name, role, slug }, (err, contributor) => {
    if (err) {
      console.log(err);
      res
        .status(400)
        .json({
          error:
            "Sprawdź czy wprowadzone dane są zgodne z Post Model Scheme lub czy nazwa posta nie jest już zajęta.",
        });
    }
    res.json(contributor);
  });
};

//method for listing all contributors
exports.list = (req, res) => {
  Contributor.find({})
    // .limit(20)
    .sort({ createdAt: 1 })
    .exec((err, contributors) => {
      if (err) console.log(err);
      res.json(contributors);
    });
};

//method for getting specific contributor based on slug
exports.read = (req, res) => {
  const { slug } = req.params;
  Contributor.findOne({ slug }).exec((err, contributor) => {
    if (err) console.log(err);
    res.json(contributor);
  });
};

// method for editing contributor
exports.edit = (req, res) => {
  const { slug } = req.params;
  const { name, role } = req.body;
  Contributor.findOneAndUpdate({ slug }, { name, role }, { new: true }).exec(
    (err, contributor) => {
      if (err) console.log(err);
      res.json(contributor);
    }
  );
};

//method for removing contributor
exports.remove = (req, res) => {
  const { slug } = req.params;
  Contributor.findOneAndRemove({ slug }).exec((err, contributor) => {
    if (err) console.log(err);
    res.json({
      message: "Contributor deleted.",
    });
  });
};
