const Donator = require("../models/donator");
const slugify = require("slugify");
const cloudinary = require("../cloudinary");

//method for creating donator
exports.create = async (req, res, callback) => {
  const { image, name, amount } = req.body;
  const slug = slugify(name);

  //validation
  switch (true) {
    case !name:
      return res.status(400).json({ error: "Name is required." });
      break;
    case !amount:
      return res.status(400).json({ error: "Amount is required." });
      break;
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "donators",
    });
    const donator = await Donator.create({
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      name,
      amount,
      slug,
    });
    res.status(201).json(donator);
    res
      .status(400)
      .json({
        error:
          "Sprawdź czy wprowadzone dane są zgodne z Donator Model Scheme lub czy nazwa donatora nie jest już zajęta.",
      });
  } catch (error) {
    console.log(error);
    callback(error);
  }
};

//method for listing all donators
exports.list = (req, res) => {
  Donator.find({})
    .sort({ amount: -1 })
    .exec((err, donators) => {
      if (err) console.log(err);
      res.json(donators);
    });
};

//method for getting specific donator based on slug
exports.read = (req, res) => {
  const { slug } = req.params;
  Donator.findOne({ slug }).exec((err, donator) => {
    if (err) console.log(err);
    res.json(donator);
  });
};

// method for editing donator
exports.edit = async (req, res, callback) => {
  const { slug } = req.params;
  const { name, amount } = req.body;

  try {
    const donator = await Donator.findOneAndUpdate(
      { slug },
      {
        name,
        amount,
      },
      { new: true }
    );
    res.status(201).json(donator);
  } catch (error) {
    console.log(error);
    callback(error);
  }
};

//method for removing donator
exports.remove = async (req, res, callback) => {
  const { slug } = req.params;

  try {
    const donator = await Donator.findOne({ slug });
    const imageId = donator.image.public_id;
    await cloudinary.uploader.destroy(imageId);
    await Donator.findOneAndRemove({ slug });

    res.status(201).json({
      success: true,
      message: "Donator deleted.",
    });
  } catch (error) {
    console.log(error);
    callback(error);
  }
};
